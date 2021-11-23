
class ARNEntity {
  constructor() {}

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

  createEntity(assetId, parentEntityId=null, position=[0,0,0], rotation=[0,0,0], scale=[1,1,1]){
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
  }

  getEntity(entityId){
    console.error('未実装です！');
    return {

    };
  }

  getEntities(assetId){
    console.error('未実装です！');
    return [];
  }

  getInputText(message){
    console.error('未実装です！');
    return new Promise();
  }
}

export default ARNEngine;
