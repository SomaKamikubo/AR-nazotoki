
class Nazo02 {
  constructor(){}
  
  init(engine){
    engine.registerAsset('nazo01-chest-model', '3d-model', './assets/nazo01/chestv2.gltf');
    engine.registerAsset('nazo01-2-img', 'image', './assets/nazo01/red_kiiro.png');
    engine.registerMarker('nazo01-map-marker', './assets/nazo01/pattern-kaiga.patt');
    const chestEntity = engine.createEntity('nazo01-chest-entity', 'nazo01-chest-model', 'nazo01-map-marker', [-2,0,2], [0,180,0]);
    
    chestEntity.addTouchedEventListener(() => {
       alert('タッチされました！');
    });
    engine.createEntity('nazo01-2-img-entity', 'nazo01-2-img', 'nazo01-chest-entity', [0, 3, 0]);
  }
}

export default new Nazo02();