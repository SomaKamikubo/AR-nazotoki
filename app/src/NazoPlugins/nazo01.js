
class Nazo01 {
  constructor(){}
  
  init(engine){
    // 1つめの謎
    engine.registerAsset('nazo01-hint-png', 'image', './assets/nazo01/nazo01.png');
    engine.registerMarker('nazo01-kohan-marker', './assets/nazo01/pattern-kohan.patt');
    engine.createEntity('nazo01-hint-png', 'nazo01-kohan-marker', [0,0,-0.5], [-90,0,0], [2,2,2]);

    // 2つめの謎（マーカーが不良のため待ち）
    // engine.registerAsset('nazo01-chest-model', '3d-model', './assets/nazo01/chestv2.gltf');
    // engine.registerMarker('nazo01-map-marker', './assets/nazo01/pattern-tizu.patt');
    // engine.createEntity('nazo01-chest-model', 'nazo01-kohan-marker');
  }
}

export default new Nazo01();