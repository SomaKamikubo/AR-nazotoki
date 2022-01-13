class Nazo04 {
  constructor(){}
  init(engine){
    // engine.registerAsset('nazo04-player1-in-png', 'image', './assets/nazo04/player1_in.png');
    // engine.registerAsset('nazo04-player1-out-png', 'image', './assets/nazo04/player1_out.png');
    // const oneMarker = engine.registerMarker('nazo04-player1-marker1', './assets/nazo03/pattern-Number1.patt');
    // const twoMarker = engine.registerMarker('nazo04-player1-marker2', './assets/nazo03/pattern-Number2.patt');
    // const outEntity = engine.createEntity('nazo04-player-out', 'nazo04-player1-out-png', 'nazo04-player1-marker1', [0,0,-0.5], [-90,0,0], [1,0.8,1]);
    // ///関数おいて,ポジション用,ローテーション用のマーカーをそれぞれ設定したい.
    // //目的:twoMarkerを傾けると,inEntityのローテーションも変わる.=>回転情報の共有.
    // //twoMarkerの傾きの情報を入手するのではなく,最初に移した際の回転情報を0とする.そこからずらすたびに計算を行う.
    // const inEntity = engine.createEntity('nazo04-player-in', 'nazo04-player1-in-png', 'nazo04-player1-marker1', [0,0.1,-0.5], [-90,0,0], [1,0.8,1]);
    // let changeRotate;
    // let lastRot = 0;
    // let markerRot = null;
    // twoMarker.addMarkerFoundEventListener(() => {
    //   console.log("検知したよ");
    //   if(markerRot === null){
    //     markerRot = twoMarker.getRotation();
    //   }
    //   changeRotate = setInterval(() => {
    //     let rot = twoMarker.getRotation()[1];
    //     if (markerRot){
    //       let diffRotY = rot - markerRot[1];
    //       console.log(rot,markerRot[1]);
    //       let diffRot =Math.abs(diffRotY);
    //       console.log(diffRotY);
    //       if (diffRot > 0) {
    //         inEntity.setRotation(-90,lastRot+diffRotY,0);
    //         lastRot = inEntity.getRotation()[1];
    //         console.log(inEntity.getRotation());
    //       }
    //     }
    //     markerRot[1] = rot;
    //   }, 500);
    // });
    // twoMarker.addMarkerLostEventListener(() => {
    //   clearInterval(changeRotate);
    //   console.log("見失ったよ");
    // });

    const syncedAreaAnchorMarker = engine.setSyncedAreaAnchor('./assets/share_marker.patt');
    const aMarker = engine.registerSyncedMarker('nazo04-img-a-marker', './assets/nazo04/pattern-Number1.patt');
    const bMarker = engine.registerSyncedMarker('nazo04-img-b-marker', './assets/nazo04/pattern-Number2.patt');
    const cubeId = engine.registerAsset('nazo04-tap-cube-model', '3d-model', './assets/nazo04/TapCube.glb');
    const clearImgPl1Id = engine.registerAsset('nazo04-clear-pl1-img', 'image', './assets/nazo04/clear_player1_b.png');
    const clearImgPl2Id = engine.registerAsset('nazo04-clear-pl2-img', 'image', './assets/nazo04/clear_player2.png');
    const cubeEntPl1 = engine.createEntity('nazo04-tap-cube-pl1', cubeId, aMarker.id);
    const cubeEntPl2 = engine.createEntity('nazo04-tap-cube-pl2', cubeId, bMarker.id);
    const clearImgEntPl1 = engine.createEntity('nazo04-clear-pl1', clearImgPl1Id, aMarker.id);
    const clearImgEntPl2 = engine.createEntity('nazo04-clear-pl2', clearImgPl2Id, bMarker.id);
    aMarker.addStateChangeListener((name, oldValue, value) => {
      if (name === 'isCleared'){
        if (value){
          cubeEntPl1.visible = false;
          clearImgEntPl1.visible = true;
        }else{
          cubeEntPl1.visible = true;
          clearImgEntPl1.visible = false;
        }
      }
    });
    bMarker.addStateChangeListener((name, oldValue, value) => {
      if (name === 'isCleared'){
        if (value){
          cubeEntPl2.visible = false;
          clearImgEntPl2.visible = true;
        }else{
          cubeEntPl2.visible = true;
          clearImgEntPl2.visible = false;
        }
      }
    });
    aMarker.commitState('isCleared', false, true);
    bMarker.commitState('isCleared', false, true);
    cubeEntPl1.addTouchedEventListener(() => {
      if (!aMarker.state.isCleared){
        engine.getInputText('答えを入力してください').then(inputText => {
          if (inputText === '8163'){
            aMarker.commitState('isCleared', true);
          }
        });
      }
    });
    cubeEntPl2.addTouchedEventListener(() => {
      if (!bMarker.state.isCleared){
        engine.getInputText('答えを入力してください').then(inputText => {
          if (inputText === '6401'){
            bMarker.commitState('isCleared', true);
          }
        });
      }
    });
  }
}
export default new Nazo04();