class Nazo03{
  constructor(){}

  init(engine){
    engine.registerAsset('nazo03-1-png','image','./assets/nazo03/pop1.png');
    const number01 = engine.registerMarker('nazo03-1-marker', './assets/nazo03/pattern-Number1.patt');
    engine.createEntity('nazo03-1-entity', 'nazo03-1-png', 'nazo03-1-marker', [0,0,-0.5], [-90,0,0], [2,2,2]);
    number01.addVisibleChangedEventListener(()=>{
      alert('うつっています');
    });


    engine.registerAsset('nazo03-2-png','image','./assets/nazo03/pop2.png');
    engine.registerMarker('nazo03-2-marker', './assets/nazo03/pattern-Number2.patt');
    engine.createEntity('nazo03-2-entity', 'nazo03-2-png', 'nazo03-2-marker', [0,0,-0.5], [-90,0,0], [2,2,2]);

    engine.registerAsset('nazo03-3-png','image','./assets/nazo03/pop3.png');
    engine.registerMarker('nazo03-3-marker', './assets/nazo03/pattern-Number3.patt');
    engine.createEntity('nazo03-3-entity', 'nazo03-3-png', 'nazo03-3-marker', [0,0,-0.5], [-90,0,0], [2,2,2]);
  }
}

export default new Nazo03();