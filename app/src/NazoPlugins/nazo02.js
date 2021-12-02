
class Nazo02 {
  constructor(){}
  
  init(engine){
    engine.registerAsset('nazo01-chest-model', '3d-model', './assets/nazo01/chestv3.gltf');
    engine.registerAsset('nazo01-2-img', 'image', './assets/nazo01/red_kiiro.png');
    engine.registerMarker('nazo01-map-marker', './assets/nazo01/pattern-kaiga.patt');
    const chestEntity = engine.createEntity('nazo01-chest-entity', 'nazo01-chest-model', 'nazo01-map-marker', [-2,0,2], [0,180,0]);
    const hintImg = engine.createEntity('nazo01-2-img-entity', 'nazo01-2-img', 'nazo01-chest-entity', [0, 3, 0]);
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