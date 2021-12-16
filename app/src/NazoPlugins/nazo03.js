class Nazo03{
  constructor(){}

  


  init(engine){
    function showSumEntity(foundNumbers,i){
      for(const j of [1,2,3,4,5,6]){
        engine.getEntity(`nazo03-${j}-entity`).visible = false;
      }     
      foundNumbers.push(i);
  
      let sumPos = [0,0,0];
      for (const number of foundNumbers) {
        for(let s = 0; s < 3; s++){
          sumPos[s] += engine.getMarker(`nazo03-${number}-marker`).position[s];
        }
      }
      const midlePos = sumPos.map(function(pos){
        return pos/foundNumbers.length;
      })
      
      const sum = foundNumbers.reduce((prev, curr) => prev + curr, 0);
      const sumEntity = engine.getEntity(`nazo03-${sum}-entity`);
      sumEntity.visible = true;
      sumEntity.position = midlePos;
      alert(`現在の合計: ${sum}`);
    }

    //registAsset
    for (const i of [1,2,3,4,5,6]){
      engine.registerAsset(`nazo03-${i}-png`,'image',`./assets/nazo03/pop${i}.png`);
    }
    let foundNumbers = [];
    for (const i of [1, 2, 3]){
      const marker = engine.registerMarker(`nazo03-${i}-marker`, `./assets/nazo03/pattern-Number${i}.patt`);
      const popEntity = engine.createEntity(`nazo03-${i}-entity`, `nazo03-${i}-png`, null, [0,0,-0.5], [0,0,0], [2,2,2]);
      popEntity.visible = false;
      const popEntity2 = engine.createEntity(`nazo03-${i+3}-entity`, `nazo03-${i+3}-png`, null, [0,0,-0.5], [0,0,0], [2,2,2]);
      popEntity2.visible = false;

      marker.addMarkerFoundEventListener(() => {
        showSumEntity(foundNumbers,i);
      });
      marker.addMarkerLostEventListener(() => {
        showSumEntity(foundNumbers,i);
      });
    }
  }
}

export default new Nazo03();