
class ARNEngine {
  constructor() {

  }

  setViewPlugin(plugin){
    console.error('未実装です！');
  }
  registerNazoPlugin(name, plugin){
    console.error('未実装です！');
  }
  registerAsset(id, type, url){
    console.error('未実装です！');
  }
  registerMarker(marker){
    console.error('未実装です！');
  }
  update(){
    console.error('未実装です！');
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
  getComponent(componentId){
    console.error('未実装です！');
    return {

    };
  }
  getComponents(assetId){
    console.error('未実装です！');
    return [];
  }
  getInputText(message){
    console.error('未実装です！');
    return new Promise();
  }
  createComponent(assetId){
    console.error('未実装です！');
  }
}

// シングルトン
export default new ARNEngine();
