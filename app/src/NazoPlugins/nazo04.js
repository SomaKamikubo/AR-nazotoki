class Nazo01 {
  constructor(){}
  
  init(engine){
    engine.registerAsset('nazo04-player1-in-png', 'image', './assets/nazo04/player1_in.png');
    engine.registerMarker('nazo04-player1-marker1', './assets/nazo03/pattern-Number1.patt');
    engine.createEntity('nazo04-player-in', 'nazo04-player1-in-png', 'nazo04-player1-marker1', [0,0,-0.5], [-90,0,0], [2,2,2]);

    engine.registerAsset('nazo04-player1-out-png', 'image', './assets/nazo04/player1_out.png');
    engine.registerMarker('nazo04-player1-marker2', './assets/nazo03/pattern-Number2.patt');
    engine.createEntity('nazo04-player-out', 'nazo04-player1-out-png', 'nazo04-player1-marker2', [0,0,-0.5], [-90,0,0], [2,2,2]);
  }
}

export default new Nazo01();