class Nazo04 {
  constructor(){}
  init(engine){
    engine.registerAsset('nazo04-player1-in-png', 'image', './assets/nazo04/player1_in.png');
    engine.registerMarker('nazo04-player1-marker1', './assets/nazo03/pattern-Number1.patt');

    engine.registerAsset('nazo04-player1-out-png', 'image', './assets/nazo04/player1_out.png');
    const rotateMarker = engine.registerMarker('nazo04-player1-marker2', './assets/nazo03/pattern-Number2.patt');
    
    const popEntity = engine.createEntity('nazo04-player-in', 'nazo04-player1-in-png', 'nazo04-player1-marker1', [0,0,-0.5], [-90,rotateMarker.rotation[1],0], [1,1,1]);
    engine.createEntity('nazo04-player-out', 'nazo04-player1-out-png', 'nazo04-player1-marker1', [0,0.1,-0.5], [-90,0,0], [1,1,1]);
    //Entity登録後に情報を取得したい.'rotation'は[object object]になっているため,数字での情報取得を目指す.
    const popinfo = document.getElementById('nazo04-player-in');
    alert(popinfo.getAttribute('src'));
    
    
    
    rotateMarker.addMarkerFoundEventListener(() => {
      alert(rotateMarker.rotation);
      // if(engine.getMarker('nazo04-player1-marker1').visible && engine.getMarker('nazo04-player1-marker2').visible){
      //   popentity_in.visible = true;
      //   popentity_out.visible = true;
      // }
    });
    rotateMarker.addMarkerLostEventListener(() => {
      // popentity_in.visible = false;
      // popentity_out.visible = false;
    });
  }
}

export default new Nazo04();