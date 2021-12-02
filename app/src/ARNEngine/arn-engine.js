
class ARNEntity {
  constructor(entityId) {
    this.id = entityId;
    this.el = document.getElementById(entityId);
  }

  get visible(){
    return this.el.object3D.visible;
  }
  set visible(v){
    this.el.object3D.visible = v;
  }

  get position(){
    const v = this.el.object3D.position;
    return [v.x, v.y, v.z];
  }
  set position(newPos){
    this.el.object3D.position.set(...newPos);
  }

  get rotation(){
    const e = this.el.object3D.rotation;
    return [e.x, e.y, e.z];
  }
  set rotation(newRotation){
    this.el.object3D.rotation.setFromVector3(...newRotation);
  }

  get scale(){
    const s = this.el.object3D.scale;
    return [s.x, s.y, s.z];
  }
  set scale(newScale){
    this.el.object3D.scale.set(...newScale);
  }

  get parent(){
    return this.el.parentElement.getAttribute('id');
  }
  set parent(entityId){
    const parentEl = document.getElementById(entityId);
    parentEl.appendChild(this.el);
  }

  get children(){
    return this.el.children.map(e => e.getAttribute('id'));
  }

  addTouchedEventListener(listener){
    //3dオブジェクトの定義
    const object = this.el.object3D;
    document.addEventListener('click',function(e){
      e.preventDefault();
      //取得した座標を-1~1の範囲に正規化する
      const touchpos = new THREE.Vector2();
      touchpos.x = (e.clientX/window.innerWidth) * 2 - 1;
      touchpos.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

      //レイキャストを作成,タッチするときのタッチした座標
      const raycaster = new THREE.Raycaster();
      //カメラの定義
      const camera = new THREE.PerspectiveCamera();
      raycaster.setFromCamera(touchpos, camera);
      const intersects = raycaster.intersectObject(object,true);
      if ( intersects.length > 0 ) {
        listener();
      }
    }, false);
  }
  destroy(){
    this.el.destroy();
  }
}

const Utils = {
  vec3ToStr(vec3){
    return vec3.reduce((pre, curr) => pre + ' ' + curr, '');
  }
};

class ARNEngine {
  constructor(sceneId) {
    this.sceneEl = document.getElementById(sceneId);
    if (!this.sceneEl){
      console.error('指定されたidを持ったsceneが存在しません！');
      return;
    }
    this.plugins = [];
  }

  registerNazoPlugin(name, plugin){
    if (!plugin || !('init' in plugin)){
      console.error('不正なプラグインです！');
      return;
    }
    this.plugins.push({ name: name, plugin: plugin });
    plugin.init(this);
    console.log(`Registered NazoPlugin: ${name}`);
  }

  registerAsset(id, type, url){
    const assetsContainer = this.sceneEl.getElementsByTagName('a-assets')[0];
    let newAssetEl = null;
    switch (type){
      case 'image':
        newAssetEl = document.createElement('img');
        break;
      case 'audio':
        newAssetEl = document.createElement('audio');
        break;
      case 'video':
        newAssetEl = document.createElement('video');
        break;
      default: // 3d-model とか
        newAssetEl = document.createElement('a-asset-item');
    }
    newAssetEl.setAttribute('id', id);
    newAssetEl.setAttribute('src', url);
    newAssetEl.setAttribute('arne-asset-type', type);
    assetsContainer.appendChild(newAssetEl);
  }

  registerMarker(id, pattUrl){
    const markerEl = document.createElement('a-marker');
    markerEl.setAttribute('id', id);
    markerEl.setAttribute('type', 'pattern');
    markerEl.setAttribute('url', pattUrl);
    this.sceneEl.appendChild(markerEl);
  }

  addEventListener(type, listener){
    console.error('未実装です！');
  }

  getMarker(markerId){
    console.error('未実装です！');
    return {
      id: 'id-string',
      awared: false,
      position: [0,0,0],
      rotation: [0,0,0]
    };
  }

  createEntity(id, assetId, parentEntityId=null, position=[0,0,0], rotation=[0,0,0], scale=[1,1,1]){
    const assetEl = document.getElementById(assetId);
    if (!assetEl){
      console.error('指定されたassetIdのアセットは存在しません！');
      return;
    }
    const assetType = assetEl.getAttribute('arne-asset-type');
    let newEntityEl = null;
    switch (assetType){
      case 'image':
        newEntityEl = document.createElement('a-image');
        break;
      case '3d-model':
        newEntityEl = document.createElement('a-gltf-model');
        break;
      default:
        console.error('不正なassetType');
        return;
    }
    newEntityEl.setAttribute('id', id);
    newEntityEl.setAttribute('src', `#${assetId}`);
    newEntityEl.setAttribute('position', `${Utils.vec3ToStr(position)}`);
    newEntityEl.setAttribute('rotation', `${Utils.vec3ToStr(rotation)}`);
    newEntityEl.setAttribute('scale', `${Utils.vec3ToStr(scale)}`);
    if (parentEntityId){
      const parentEl = document.getElementById(parentEntityId);
      parentEl.appendChild(newEntityEl);
    }else{
      this.sceneEl.appendChild(newEntityEl);
    }
    return new ARNEntity(id);
  }

  getEntity(entityId){
    return new ARNEntity(entityId);
  }

  getEntities(assetId){
    console.error('未実装です！');
    return [];
  }

  getInputText(message){
    return new Promise((resolve, reject) => {
      // messageを表示してユーザに入力を促す。
      let answer = prompt(message);
      resolve(answer);
    });
  }
}

export default ARNEngine;
