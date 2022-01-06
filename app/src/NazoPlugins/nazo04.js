class Nazo04 {
  constructor(){}
  init(engine){
    engine.registerAsset('nazo04-player1-in-png', 'image', './assets/nazo04/player1_in.png');
    engine.registerAsset('nazo04-player1-out-png', 'image', './assets/nazo04/player1_out.png');
    const oneMarker = engine.registerMarker('nazo04-player1-marker1', './assets/nazo03/pattern-Number1.patt');
    const twoMarker = engine.registerMarker('nazo04-player1-marker2', './assets/nazo03/pattern-Number2.patt');
    const outEntity = engine.createEntity('nazo04-player-out', 'nazo04-player1-out-png', 'nazo04-player1-marker1', [0,0.1,-0.5], [-90,0,0], [1,1,1]);
    const inEntity = engine.createEntity('nazo04-player-in', 'nazo04-player1-in-png', 'nazo04-player1-marker2', oneMarker.getPosition(), [-90,0,0], [1,1,1]);

    //マーカーの角度を検出するためのエンティティ
    //const testEntity = engine.createEntity('nazo04-player-test', 'nazo04-player1-out-png', 'nazo04-player1-marker2', [0,0.1,-0.5], [-90,0,0], [1,1,1]);
    
    oneMarker.addMarkerFoundEventListener(() => {
      alert(oneMarker.getPosition());
      inEntity.setPositon(oneMarker.getPosition()); 
    });
    oneMarker.addMarkerLostEventListener(() => {
      
    });
  }
}

export default new Nazo04();