class Nazo03{
  constructor(){}


  init(engine){
    //registAsset
    for (const i of [1,2,3,4,5,6]){
      engine.registerAsset(`nazo03-${i}-png`,'image',`./assets/nazo03/pop${i}.png`);
    }
    let foundNumbers = [];
    for (const i of [1, 2, 3]){
      const marker = engine.registerMarker(`nazo03-${i}-marker`, `./assets/nazo03/pattern-Number${i}.patt`);
      const popEntity = engine.createEntity(`nazo03-${i}-entity`, `nazo03-${i}-png`, `nazo03-${i}-marker`, [0,0,-0.5], [-90,0,0], [2,2,2]);
      popEntity.visible = false;
      const sumEntity = engine.createEntity(`nazo03-${i+3}-entity`, `nazo03-${i+3}-png`, `nazo03-${i}-marker`, [0,0,-0.5], [-90,0,0], [2,2,2]);
      sumEntity.visible = false;

      marker.addMarkerFoundEventListener(() => {
        for(const j of [1,2,3,4,5,6]){
          engine.getEntity(`nazo03-${j}-entity`).visible = false;
        }     
        foundNumbers.push(i);
        const sum = foundNumbers.reduce((prev, curr) => prev + curr, 0);
        alert(`現在の合計: ${sum}`);
        engine.getEntity(`nazo03-${sum}-entity`).visible = true;
      });
      marker.addMarkerLostEventListener(() => {
        for(const j of [1,2,3,4,5,6]){
          engine.getEntity(`nazo03-${j}-entity`).visible = false;
        }
        foundNumbers = foundNumbers.filter(x => x != i);
        const sum = foundNumbers.reduce((prev, curr) => prev + curr, 0);
        alert(`現在の合計: ${sum}`);
        engine.getEntity(`nazo03-${sum}-entity`).visible = true;
      });
    }
  }
}

export default new Nazo03();