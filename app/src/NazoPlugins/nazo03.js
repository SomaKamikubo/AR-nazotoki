class Nazo03{
  constructor(){}
  init(engine){
    //position計算
    function midleCal(foundNumbers){
      let sumPos = [0,0,0];
      for (const number of foundNumbers) {
        for(let s = 0; s < 3; s++){
          sumPos[s] += engine.getMarker(`nazo03-${number}-marker`).position[s];
        }
      }
      const midlePos = sumPos.map(function(pos){
        return pos/foundNumbers.length;
      })
      midlePos[2] = -0.5;
      return midlePos;
    }
    //visible,positionの調整
    function showEntity(foundNumbers){
      const sum = foundNumbers.reduce((prev, curr) => prev + curr, 0);
      if(sum == 3 && engine.getMarker(`nazo03-1-marker`).visible){
        const sumEntity = engine.getEntity(`nazo03-${sum}-sumentity`);
        sumEntity.visible = true;
        sumEntity.position = midleCal(foundNumbers);
      }else{
        const sumEntity = engine.getEntity(`nazo03-${sum}-entity`);
        sumEntity.visible = true;
        sumEntity.position = midleCal(foundNumbers);
      }
    }

    let foundNumbers = [];
    //registAsset
    for (const i of [1,2,3,4,5,6]){
      engine.registerAsset(`nazo03-${i}-png`,'image',`./assets/nazo03/pop${i}.png`);
    }

    for (const i of [1, 2, 3]){
      const marker = engine.registerMarker(`nazo03-${i}-marker`, `./assets/nazo03/pattern-Number${i}.patt`);
      if(i == 3){
        const popEntity = engine.createEntity(`nazo03-${i}-sumentity`, `nazo03-${i}-png`, `nazo03-${1}-marker`, [0,0,-0.5], [-90,0,0], [2,2,2]);
        popEntity.visible = false;
      }
      const popEntity = engine.createEntity(`nazo03-${i}-entity`, `nazo03-${i}-png`, `nazo03-${i}-marker`, [0,0,-0.5], [-90,0,0], [2,2,2]);
      const popEntity2 = engine.createEntity(`nazo03-${i+3}-entity`, `nazo03-${i+3}-png`,`nazo03-${i}-marker`, [0,0,-0.5], [-90,0,0], [2,2,2]);
      popEntity.visible = false;
      popEntity2.visible = false;
      
    //markerを見つけた時
      marker.addMarkerFoundEventListener(() => {
        for(const j of [1,2,3,4,5,6]){
          engine.getEntity(`nazo03-${j}-entity`).visible = false;
        }
        engine.getEntity(`nazo03-3-sumentity`).visible = false;
        foundNumbers.push(i);
        showEntity(foundNumbers);
      });
    //markerを見失った時
      marker.addMarkerLostEventListener(() => {
        for(const j of [1,2,3,4,5,6]){
          engine.getEntity(`nazo03-${j}-entity`).visible = false;
        }
        engine.getEntity(`nazo03-3-sumentity`).visible = false;
        foundNumbers = foundNumbers.filter(x => x != i);
        showEntity(foundNumbers);
      });
    }
  }
}

export default new Nazo03();