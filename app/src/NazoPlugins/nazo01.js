
class Nazo01 {
  constructor(){}
  
  init(engine){
    engine.registerAsset('nazo01-hint-png', 'image', './assets/nazo01/nazo01.png');
    engine.registerMarker('nazo01-kohan-marker', './assets/nazo01/pattern-kohan.patt');
    engine.createEntity('nazo01-hint-entity', 'nazo01-hint-png', 'nazo01-kohan-marker', [0,0,-0.5], [-90,0,0], [2,2,2]);
  }
}

export default new Nazo01();