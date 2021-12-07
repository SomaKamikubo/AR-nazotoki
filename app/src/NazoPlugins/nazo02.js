
class Nazo02 {
  constructor(){}
  
  init(engine){
    engine.registerAsset('nazo02-chest-model', '3d-model', './assets/nazo02/chestv3.gltf');
    engine.registerAsset('nazo02-img', 'image', './assets/nazo02/red_kiiro.png');
    engine.registerMarker('nazo02-map-marker', './assets/nazo02/pattern-kaiga.patt');
    const chestEntity = engine.createEntity('nazo02-chest-entity', 'nazo02-chest-model', 'nazo02-map-marker', [-2,0,2], [0,180,0]);
    const hintImg = engine.createEntity('nazo02-img-entity', 'nazo02-img', 'nazo02-chest-entity', [0, 3, 0]);
    let chestOpend = false;
    chestEntity.addTouchedEventListener(() => {
      if (!chestOpend){
        engine.getInputText('答えを入力してください').then(inputText => {
          if (inputText === 'route'){
            chestOpend = true;
            chestEntity.el.object3D.traverse(obj => {
              if (obj.name == 'Cube'){
                obj.rotation.set(107*Math.PI/180,0,0);
                hintImg.visible = false;
              }
            });
            alert('正解です！');
          }else{
            alert('不正解');
          }
        });
      }
    });
  }
}

export default new Nazo02();