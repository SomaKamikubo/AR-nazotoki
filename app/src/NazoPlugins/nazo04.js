class Nazo04 {
  constructor(){}
  init(engine){
    engine.registerAsset('nazo04-player1-in-png', 'image', './assets/nazo04/player1/player1_in.png');
    engine.registerAsset('nazo04-player1-out-png', 'image', './assets/nazo04/player1/player1_out.png');
    engine.registerAsset('nazo04-player2-in-png', 'image', './assets/nazo04/player2/player2_in.png');
    engine.registerAsset('nazo04-player2-out-png', 'image', './assets/nazo04/player2/player2_out.png');
    // //rotationの初期値は,雑な数字に.

    function showEntity(foundNumbers,playerNumber){
      if(playerNumber === 1){
        const sum = foundNumbers.reduce((prev, curr) => prev + curr, 0);
        if(sum == 3){
          //alert(3)
          engine.getEntity('nazo04-player1-1').visible = true;
          engine.getEntity('nazo04-player1-2').visible = false;
        
          
        }else if(sum == 2){
          //alert(2)
          engine.getEntity('nazo04-player1-1').visible = false;
          engine.getEntity('nazo04-player1-2').visible = true;

        }else if(sum == 1){
          //alert(1)
          engine.getEntity('nazo04-player1-1').visible = false;
          engine.getEntity('nazo04-player1-2').visible = false;
        }
      }
      else if(playerNumber === 2){
        const sum = foundNumbers.reduce((prev, curr) => prev + curr, 0);
        if(sum == 3){
          //alert(3)
          engine.getEntity('nazo04-player2-1').visible = true;
          engine.getEntity('nazo04-player2-2').visible = false;
        
          
        }else if(sum == 2){
          //alert(2)
          engine.getEntity('nazo04-player2-1').visible = false;
          engine.getEntity('nazo04-player2-2').visible = true;

        }else if(sum == 1){
          //alert(1)
          engine.getEntity('nazo04-player2-1').visible = false;
          engine.getEntity('nazo04-player2-2').visible = false;
        }
      }
    }

    let foundNumbers = [];
    let foundNumbers2 = [];
    //inEntity.setRotation([-90*Math.PI/180,0,0,"XYZ"]);
    let changeRotate;
    let changeRotate2;
    let entitiyRot = 0;
    console.log("fist:"+entitiyRot*180/Math.PI);
    let beforeMarkerRot = null;

    for (const i of [1, 2]){
      const marker = engine.registerMarker(`nazo04-player1-marker${i}`, `./assets/nazo04/player1/player1-kaiga${i}.patt`);
      const popEntity = engine.createEntity(`nazo04-player1-${i}`, `nazo04-player1-in-png`, `nazo04-player1-marker${i}`, [0,0,-0.5], [-90,0,0], [1.2,1,1.2]);    
      popEntity.visible = false;
      engine.createEntity('nazo04-player-out', 'nazo04-player1-out-png', 'nazo04-player1-marker1', [0,0.1,-0.5], [-90,0,0], [1,0.8,1]);

      
    //markerを見つけた時
      marker.addMarkerFoundEventListener(() => {
        const twoMarker = engine.getMarker('nazo04-player1-marker2');
        const inEntity = engine.getEntity('nazo04-player1-1');
        if(beforeMarkerRot === null){
          beforeMarkerRot = twoMarker.getRotation()[2];
        }
        changeRotate = setInterval(() => {
          console.log("before:"+entitiyRot);
          let nowMarkerRot = twoMarker.getRotation()[2];
          if (beforeMarkerRot){
            let diffRot = nowMarkerRot - beforeMarkerRot;
            console.log("差:"+diffRot*180/Math.PI);
            //console.log(nowMarkerRot,beforeMarkerRot);
            //console.log(diffRotY);
            if (diffRot != 0) {
              let newEntityRot = entitiyRot+diffRot;
              inEntity.setRotation([-90*Math.PI/180,0,newEntityRot,"XYZ"]);
              console.log("get_rotation"+inEntity.getRotation());
              entitiyRot = newEntityRot;
              //console.log(inEntity.getRotation());
            }
          }
          beforeMarkerRot = nowMarkerRot;
        }, 500);
        for(const j of [1,2]){
          engine.getEntity(`nazo04-player1-${i}`).visible = false;
        }
        foundNumbers.push(i);
        showEntity(foundNumbers,1);
      });
    //markerを見失った時
      marker.addMarkerLostEventListener(() => {
        for(const j of [1,2]){
          engine.getEntity(`nazo04-player1-${i}`,).visible = false;
        }
        foundNumbers = foundNumbers.filter(x => x != i);
        showEntity(foundNumbers,1);
        clearInterval(changeRotate);
      });
    }

    //player2
    for (const i of [1, 2]){
      const marker2 = engine.registerMarker(`nazo04-player2-marker${i}`, `./assets/nazo04/player2/player2-kaiga${i}.patt`);
      const popEntity = engine.createEntity(`nazo04-player2-${i}`, `nazo04-player2-in-png`, `nazo04-player2-marker${i}`, [0,0,-0.5], [-90,90,0], [1,0.8,1]);    
      popEntity.visible = false;
      engine.createEntity('nazo04-player-out', 'nazo04-player2-out-png', 'nazo04-player2-marker1', [0,0.1,-0.5], [-90,0,0], [1.2,1,1.2]);

    
    //markerを見つけた時
      marker2.addMarkerFoundEventListener(() => {
        const twoMarker = engine.getMarker('nazo04-player2-marker2');
        const inEntity = engine.getEntity('nazo04-player2-1');
        beforeMarkerRot = twoMarker.getRotation()[2];
        
        changeRotate2 = setInterval(() => {
          console.log("before:"+entitiyRot);
          let nowMarkerRot = twoMarker.getRotation()[2];
          //console.log("nowMarkerRot="+nowMarkerRot*180/Math.PI);
          let diffRot = nowMarkerRot - beforeMarkerRot;
          console.log("差:"+diffRot*180/Math.PI);
          //console.log(nowMarkerRot,beforeMarkerRot);
          if (Math.abs(diffRot*180/Math.PI) >= 0) {
            let newEntityRot = entitiyRot+diffRot;
            inEntity.setRotation([-90*Math.PI/180,0,newEntityRot,"XYZ"]);
            //console.log("get_rotation"+inEntity.getRotation());
            entitiyRot = newEntityRot;//Entityの角度の更新
            console.log("entitiyRot="+entitiyRot*180/Math.PI);
            beforeMarkerRot = nowMarkerRot;
            //console.log("newEntityRot="+newEntityRot);
          }
          
        }, 1000);
        for(const j of [1,2]){
          engine.getEntity(`nazo04-player2-${i}`).visible = false;
        }
        foundNumbers2.push(i);
        showEntity(foundNumbers2,2);
      });
    //markerを見失った時
      marker2.addMarkerLostEventListener(() => {
        for(const j of [1,2]){
          engine.getEntity(`nazo04-player2-${i}`,).visible = false;
        }
        foundNumbers2 = foundNumbers2.filter(x => x != i);
        showEntity(foundNumbers2,2);
        clearInterval(changeRotate2);
      });
    }

  }
}
export default new Nazo04();