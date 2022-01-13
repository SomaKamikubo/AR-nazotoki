class Nazo04 {
  constructor(){}
  init(engine){
    engine.registerAsset('nazo04-player1-in-png', 'image', './assets/nazo04/player1_in.png');
    engine.registerAsset('nazo04-player1-out-png', 'image', './assets/nazo04/player1_out.png');
    const oneMarker = engine.registerMarker('nazo04-player1-marker1', './assets/nazo03/pattern-Number1.patt');
    const twoMarker = engine.registerMarker('nazo04-player1-marker2', './assets/nazo03/pattern-Number2.patt');
    engine.createEntity('nazo04-player-out', 'nazo04-player1-out-png', 'nazo04-player1-marker1', [0,0,-0.5], [-90,0,0], [1,0.8,1]);
    //表示されるEntityは分けたい
    //Markerを変えたい.
    //マーカーが検知されているかをユーザーにわかりやすくしたい
    //rotationの初期値は,雑な数字に.
    const inEntity = engine.createEntity('nazo04-player-in', 'nazo04-player1-in-png', 'nazo04-player1-marker1', [0,0.01,-0.5], [-90,90,0], [1*1.2,0.8*1.2,1*1.2]);
    inEntity.setRotation([-90,180,0,"XYZ"]);
    let changeRotate;
    let lastRot = inEntity.getRotation()[1];
    let markerRot = null;
    twoMarker.addMarkerFoundEventListener(() => {
      console.log("検知したよ");
      if(markerRot === null){
        markerRot = twoMarker.getRotation();
      }
      changeRotate = setInterval(() => {
        let rot = twoMarker.getRotation()[1];
        if (markerRot){
          let diffRotY = rot - markerRot[1];
          console.log(rot,markerRot[1]);
          let diffRot =Math.abs(diffRotY);
          console.log(diffRotY);
          if (diffRot > 0) {
            inEntity.setRotation([lastRot+diffRotY,-90,0,"XYZ"]);
            lastRot = inEntity.getRotation()[1];
            console.log(inEntity.getRotation());
          }
        }
        markerRot[1] = rot;
      }, 500);
    });
    twoMarker.addMarkerLostEventListener(() => {
      clearInterval(changeRotate);
      alert(inEntity.getRotation());
      console.log("見失ったよ");
    });
  }
}
export default new Nazo04();