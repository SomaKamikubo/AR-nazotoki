class Nazo03{
  constructor(){}

  init(engine){
    let foundNumbers = [];
    for (const i of [1, 2, 3]){
      engine.registerAsset(`nazo03-${i}-png`,'image',`./assets/nazo03/pop${i}.png`);
      const marker = engine.registerMarker(`nazo03-${i}-marker`, `./assets/nazo03/pattern-Number${i}.patt`);
      const popEntity = engine.createEntity(`nazo03-${i}-entity`, `nazo03-${i}-png`, `nazo03-${i}-marker`, [0,0,-0.5], [-90,0,0], [2,2,2]);
      marker.addMarkerFoundEventListener(() => {
        foundNumbers.push(i);
        const sum = foundNumbers.reduce((prev, curr) => prev + curr, 0);
        alert(`現在の合計: ${sum}`);
      });
      marker.addMarkerLostEventListener(() => {
        foundNumbers = foundNumbers.filter(x => x != i);
        const sum = foundNumbers.reduce((prev, curr) => prev + curr, 0);
        alert(`現在の合計: ${sum}`);
      });
    }
  }
}

export default new Nazo03();