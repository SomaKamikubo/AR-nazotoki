class Nazo04 {
  constructor(){}
  init(engine){
    engine.registerAsset('nazo04-player1-in-png', 'image', './assets/nazo04/player1/player1_in.png');
    engine.registerAsset('nazo04-player1-out-png', 'image', './assets/nazo04/player1/player1_out.png');
    engine.registerAsset('nazo04-player2-in-png', 'image', './assets/nazo04/player2/player2_in.png');
    engine.registerAsset('nazo04-player2-out-png', 'image', './assets/nazo04/player2/player2_out.png');

    function showEntity(foundNumbers,playerNumber){
      engine.getEntity(`nazo04-player1-1`).visible = false;
      engine.getEntity(`nazo04-player1-2`).visible = false;
      engine.getEntity(`nazo04-player2-1`).visible = false;
      engine.getEntity(`nazo04-player2-2`).visible = false;
      if(playerNumber === 1){
        const sum = foundNumbers.reduce((prev, curr) => prev + curr, 0);
        if(sum == 3){
          engine.getEntity('nazo04-player1-1').visible = true;
          engine.getEntity('nazo04-player1-2').visible = false;        
          
        }else if(sum == 2){
          engine.getEntity('nazo04-player1-1').visible = false;
          engine.getEntity('nazo04-player1-2').visible = true;

        }else if(sum == 1){
          engine.getEntity('nazo04-player1-1').visible = false;
          engine.getEntity('nazo04-player1-2').visible = false;
        }
      }
      else if(playerNumber === 2){
        const sum = foundNumbers.reduce((prev, curr) => prev + curr, 0);
        if(sum == 3){
          engine.getEntity('nazo04-player2-1').visible = true;
          engine.getEntity('nazo04-player2-2').visible = false;
        
          
        }else if(sum == 2){
          engine.getEntity('nazo04-player2-1').visible = false;
          engine.getEntity('nazo04-player2-2').visible = true;

        }else if(sum == 1){
          engine.getEntity('nazo04-player2-1').visible = false;
          engine.getEntity('nazo04-player2-2').visible = false;
        }
      }
    }

    let foundNumbers = [];
    let foundNumbers2 = [];
    let changeRotate;
    let changeRotate2;
    let count;

  

  

    for (const i of [1, 2]){
      const marker = engine.registerMarker(`nazo04-player1-marker${i}`, `./assets/nazo04/player1/player1-kaiga${i}.patt`);
      engine.createEntity(`nazo04-player1-${i}`, `nazo04-player1-in-png`, `nazo04-player1-marker${i}`, [0,0,-0.5], [-90,0,0], [1.2,1,1.2]);    
      engine.createEntity('nazo04-player-out', 'nazo04-player1-out-png', 'nazo04-player1-marker1', [0,0.1,-0.5], [-90,0,0], [1,0.8,1]);
      
      
      //markerを見つけた時
      marker.addMarkerFoundEventListener(() => {
        const twoMarker = engine.getMarker('nazo04-player1-marker2');
        const inEntity = engine.getEntity('nazo04-player1-1');
      
        foundNumbers.push(i);
        showEntity(foundNumbers,1);

        //マーカーが二つとも映っていたら
        if(inEntity.visible){
          count=0;
          changeRotate = setInterval(() => {
            count += 1;
            console.log(count);

            let nowRot = twoMarker.getRotation()[2];
            inEntity.setRotation([-90*Math.PI/180 ,0 ,nowRot,"XYZ"]);
            console.log("nowRot:"+nowRot*180/Math.PI);
          }, 500);
        }
      });

    //markerを見失った時
      marker.addMarkerLostEventListener(() => {
        foundNumbers = foundNumbers.filter(x => x != i);
        showEntity(foundNumbers,1);
        clearInterval(changeRotate);
      });
    }

    //player2
    for (const i of [1, 2]){
      const marker2 = engine.registerMarker(`nazo04-player2-marker${i}`, `./assets/nazo04/player2/player2-kaiga${i}.patt`);
      engine.createEntity(`nazo04-player2-${i}`, `nazo04-player2-in-png`, `nazo04-player2-marker${i}`, [0,0,-0.5], [-90,90,0], [1,0.8,1]);    
      engine.createEntity('nazo04-player-out', 'nazo04-player2-out-png', 'nazo04-player2-marker1', [0,0.1,-0.5], [-90,0,0], [1.2,1,1.2]);
      
      //markerを見つけた時
      marker2.addMarkerFoundEventListener(() => {
        const twoMarker = engine.getMarker('nazo04-player2-marker2');
        const inEntity = engine.getEntity('nazo04-player2-1');

        foundNumbers2.push(i);
        showEntity(foundNumbers2,2);
        
        //マーカーが二つとも映っていたら
        if(inEntity.visible){
          count=0;
          changeRotate = setInterval(() => {
            count += 1;
            console.log(count);

            let nowRot = twoMarker.getRotation()[2];
            inEntity.setRotation([-90*Math.PI/180 ,0 ,nowRot,"XYZ"]);
            console.log("nowRot:"+nowRot*180/Math.PI);
          }, 500);
        }
      });

      //markerを見失った時
      marker2.addMarkerLostEventListener(() => {
        foundNumbers2 = foundNumbers2.filter(x => x != i);
        showEntity(foundNumbers2,2);
        clearInterval(changeRotate2);
      });
    }

   

    const syncedAreaAnchorMarker = engine.setSyncedAreaAnchor('./assets/share_marker.patt');
    const aMarker = engine.registerSyncedMarker('nazo04-img-a-marker', './assets/nazo04/pattern-Number1.patt');
    const bMarker = engine.registerSyncedMarker('nazo04-img-b-marker', './assets/nazo04/pattern-Number2.patt');
    const cubeTexId = engine.registerAsset('nazo04-tap-cube-tex', 'image', './assets/nazo04/pls_tap_img.png');
    const clearImgPl1Id = engine.registerAsset('nazo04-clear-pl1-img', 'image', './assets/nazo04/clear_player1_b.png');
    const clearImgPl2Id = engine.registerAsset('nazo04-clear-pl2-img', 'image', './assets/nazo04/clear_player2.png');
    const cubeEntPl1 = engine.createEntityFromPrimShape('nazo04-tap-cube-pl1', 'box', aMarker.id);
    cubeEntPl1.el.setAttribute('material', `shader: flat; src: #${cubeTexId};`);
    const cubeEntPl2 = engine.createEntityFromPrimShape('nazo04-tap-cube-pl2', 'box', bMarker.id);
    cubeEntPl2.el.setAttribute('material', `shader: flat; src: #${cubeTexId};`);
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