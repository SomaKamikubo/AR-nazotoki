import { io } from 'socket.io-client';

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

  getPosition(){
    const v = this.el.object3D.position;
    return [v.x, v.y, v.z];
  }
  setPosition(x,y,z){
    this.el.object3D.position.set(x,y,z);
  }

  getRotation(){
    const e = this.el.object3D.rotation;
    return [e.x, e.y, e.z, e.w];
  }
  setRotation(x,y,z){
    this.el.object3D.rotation.set(x,y,z);
  }

  getScale(){
    const s = this.el.object3D.scale;
    return [s.x, s.y, s.z];
  }
  setScale(newScale){
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
      const camera = document.getElementById('camera').getObject3D('camera');
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

class ARNMarkerEntity extends ARNEntity{
  addMarkerFoundEventListener(listener){
    this.el.addEventListener('markerFound', listener);
  }
  addMarkerLostEventListener(listener){
    this.el.addEventListener('markerLost', listener);
  }
}

class ARNSyncedMarkerEntity extends ARNEntity {
  constructor(entityId){
    super(entityId);
    this.visible = false;
    this.internalMarkerEl = document.getElementById(`[System]${entityId}-internal[System]`);
    this.internalMarkerEl.addEventListener('markerFound', () => this._foundMarker.call(this));
    this.internalMarkerEl.addEventListener('markerLost', () => this._lostMarker.call(this));
    this._markerFoundEventListeners = [];
    this._markerLostEventListeners = [];
    this._state = {};
    this._stateChangeListeners = [];
    this._stateChangeEmitter = null;
  }

  get state(){
    return this._state;
  }
  commitState(name, value, noSync=false){
    const oldValue = this._state[name];
    this._state[name] = value;
    if (!noSync){
      this._stateChangeEmitter?.call(this, [name, value]);
    }
    for (const listener of this._stateChangeListeners){
      listener.call(this, [name, oldValue, value]);
    }
  }
  addStateChangeListener(listener){
    this._stateChangeListeners.push(listener);
  }

  _foundMarker(){
    this.visible = true;
    for (const listener of this._markerFoundEventListeners){
      listener.call(this);
    }
  }
  _lostMarker(){
    this.visible = false;
    for (const listener of this._markerLostEventListeners){
      listener.call(this);
    }
  }
  _syncTransform(position, rotation){
    this.setPosition(position);
    this.setRotation(rotation);
  }

  addMarkerFoundEventListener(listener){
    this._markerFoundEventListeners.push(listener);
  }
  addMarkerLostEventListener(listener){
    this._markerLostEventListeners.push(listener);
  }
}

class ARNEngine {
  constructor(sceneId) {
    this.sceneEl = document.getElementById(sceneId);
    if (!this.sceneEl){
      console.error('指定されたidを持ったsceneが存在しません！');
      return;
    }
    this.plugins = [];
    this.syncedAreaAnchorMarker = null;
    this.syncedMarkerEntities = {};
    this._updateHandlers = [];
    this._updateTimer = setInterval(() => {
      for (const handler of this._updateHandlers){
        handler.call(this);
      }
    }, 50); // updateの周期
    this._connectIO();
  }

  _connectIO(){
    const connPath = (location.pathname).split('/').slice(0, -1).join('/');
    const searchParams = new URLSearchParams(location.search);

    const socket = io({
      path: `${connPath}/socket.io/`,
    });
    console.log(`Connecting to ${connPath}`);

    socket.on('connect', () => {
      console.log('接続完了!');
      if (searchParams.has('id')){
        socket.emit('joinRoom', searchParams.get('id'), (res) => {
          console.log(`JoinRoom ${res.roomId}`);
          console.log(res);
        });
      }
    });
    
    socket.on('echo', text => {
      console.log(text);
    });
    socket.on('foundSyncedMarker', (markerId, senderId) => {
      if (markerId in this.syncedMarkerEntities){
        this.syncedMarkerEntities[markerId]._foundMarker();
      }
    });
    socket.on('lostSyncedMarker', (markerId, senderId) => {
      if (markerId in this.syncedMarkerEntities){
        this.syncedMarkerEntities[markerId]._lostMarker();
      }
    });
    socket.on('syncTransform', (objId, position, rotation) => {
      if (objId in this.syncedMarkerEntities){
        this.syncedMarkerEntities[objId]._syncTransform(position, rotation);
      }
    });
    socket.on('syncState', (entityId, name, value) => {
      if (entityId in this.syncedMarkerEntities){
        this.syncedMarkerEntities[entityId].commitState(name, value, true);
      }
    });

    this.socket = socket;
    this.addUpdateHandler(this._updateSyncedObjects);
  }

  _updateSyncedObjects(){
    if (!this.syncedAreaAnchorMarker || !this.syncedAreaAnchorMarker.visible){
      return;
    }
    const aPos = this.syncedAreaAnchorMarker.el.object3D.position;
    const aRot = this.syncedAreaAnchorMarker.el.object3D.rotation;
    for (const syncedEntity of Object.values(this.syncedMarkerEntities)){
      const inEl = syncedEntity.internalMarkerEl;
      if (inEl && inEl.object3D.visible){
        const pos = inEl.object3D.position;
        const rot = inEl.object3D.rotation;
        const relPos = [pos.x-aPos.x, pos.y-aPos.y, pos.z-aPos.z];
        const relRot = [rot.x-aRot.x, rot.y-aRot.y, rot.z-aRot.z, rot.w-aRot.w];
        syncedEntity._syncTransform(relPos, relRot);
        this.socket.emit('syncTransform', relPos, relRot);
      }
    }
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

    return new ARNMarkerEntity(id);
  }

  addUpdateHandler(handler){
    this._updateHandlers.push(handler);
  }

  setSyncedAreaAnchor(pattUrl){
    if (this.syncedAreaAnchorMarker){
      const pUrl = this.syncedAreaAnchorMarker.el.getAttribute('url');
      if (pattUrl === pUrl){
        return this.syncedAreaAnchorMarker;
      }else{
        this.syncedAreaAnchorMarker.el.remove();
        this.syncedAreaAnchorMarker = null;
        console.error('既に登録されているSyncedAreaAnchorMarkerを上書きしました。古いほうを使用しているコードで問題が起きる可能性があります!');
      }
    }
    const markerEl = document.createElement('a-marker');
    const id = '[System]Synced-Area-Anchor-Marker[System]';
    markerEl.setAttribute('id', id);
    markerEl.setAttribute('type', 'pattern');
    markerEl.setAttribute('url', pattUrl);
    this.sceneEl.appendChild(markerEl);

    const marker = new ARNMarkerEntity(id);
    this.syncedAreaAnchorMarker = marker;
    return marker;
  }

  registerSyncedMarker(id, pattUrl){
    if (!this.syncedAreaAnchorMarker){
      console.error('SyncedMarkerを登録する前に setSyncedAreaAnchor をする必要があります!');
      return;
    }
    const markerEl = document.createElement('a-marker');
    markerEl.setAttribute('id', `[System]${id}-internal[System]`);
    markerEl.setAttribute('type', 'pattern');
    markerEl.setAttribute('url', pattUrl);
    markerEl.addEventListener('markerFound', () => {
      this.socket.emit('foundSyncedMarker', id);
    });
    markerEl.addEventListener('markerLost', () => {
      this.socket.emit('lostSyncedMarker', id);
    });
    this.sceneEl.appendChild(markerEl);

    const syncedEl = document.createElement('a-entity');
    syncedEl.setAttribute('id', id);
    this.syncedAreaAnchorMarker.el.appendChild(syncedEl);
    const syncedEntity = new ARNSyncedMarkerEntity(id);
    syncedEntity._stateChangeEmitter = (name, value) => {
      this.socket.emit('syncState', id, name, value);
    };
    this.syncedMarkerEntities[id] = syncedEntity;

    return syncedEntity;
  }

  addEventListener(type, listener){
    console.error('未実装です！');
  }

  getMarker(markerId){
    return new ARNMarkerEntity(markerId);
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
