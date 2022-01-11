class Nazo04 {
  constructor(){}
  init(engine){
    let lastRot;
    
    engine.registerAsset('nazo04-player1-in-png', 'image', './assets/nazo04/player1_in.png');
    engine.registerAsset('nazo04-player1-out-png', 'image', './assets/nazo04/player1_out.png');
    const oneMarker = engine.registerMarker('nazo04-player1-marker1', './assets/nazo03/pattern-Number1.patt');
    const twoMarker = engine.registerMarker('nazo04-player1-marker2', './assets/nazo03/pattern-Number2.patt');
    const outEntity = engine.createEntity('nazo04-player-out', 'nazo04-player1-out-png', 'nazo04-player1-marker1', [0,0,-0.5], [-90,0,0], [1,0.8,1]);
    ///関数おいて,ポジション用,ローテーション用のマーカーをそれぞれ設定したい.
    //twoMarkerを傾けると,inEntityのローテーションも変わる.=>回転情報の共有.
    //twoMarkerの傾きの情報を入手するのではなく,最初に移した際の回転情報を0とする.そこからずらすたびに計算を行う.
    const inEntity = engine.createEntity('nazo04-player-in', 'nazo04-player1-in-png', 'nazo04-player1-marker1', [0,0.1,-0.5], [-90,0,0], [1,0.8,1]);
    let changeRotate;
    twoMarker.addMarkerFoundEventListener(() => {
      lastRot = 0;
      console.log("検知したよ");
      changeRotate = setInterval(() => {
        inEntity.setRotation(-90,lastRot+0.1,0);
        lastRot = inEntity.getRotation()[1];
        console.log(inEntity.getRotation());
      }, 500);
    });
    twoMarker.addMarkerLostEventListener(() => {
      clearInterval(changeRotate);
      console.log("見失ったよ");
    });
  }
}
export default new Nazo04();