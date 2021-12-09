class Nazo03{
  constructor(){}

  init(engine){
    engine.registerAsset('nazo03-1-png','image','./assets/nazo03/pop1.png');
    const number01_marker = engine.registerMarker('nazo03-1-marker', './assets/nazo03/pattern-Number1.patt');
    const number01 = engine.createEntity('nazo03-1-entity', 'nazo03-1-png', 'nazo03-1-marker', [0,0,-0.5], [-90,0,0], [2,2,2]);
    


    engine.registerAsset('nazo03-2-png','image','./assets/nazo03/pop2.png');
    const number02_marker = engine.registerMarker('nazo03-2-marker', './assets/nazo03/pattern-Number2.patt');
    const number02 = engine.createEntity('nazo03-2-entity', 'nazo03-2-png', 'nazo03-2-marker', [0,0,-0.5], [-90,0,0], [2,2,2]);

    engine.registerAsset('nazo03-3-png','image','./assets/nazo03/pop3.png');
    const number03_marker = engine.registerMarker('nazo03-3-marker', './assets/nazo03/pattern-Number3.patt');
    const number03 = engine.createEntity('nazo03-3-entity', 'nazo03-3-png', 'nazo03-3-marker', [0,0,-0.5], [-90,0,0], [2,2,2]);

    // number01.addTouchedEventListener(() => {
    //   alert('うつっています');
    //   var markers = [number01_marker ,number02_marker, number03_marker];
    //   var entitys = [number01,number02,number03];
    //   var visibleMarkers = [];

    //   markers.forEach(function(marker, index) {
    //     if(marker.visible){
    //       visibleMarkers.push(marker);
    //       entitys[index].visible = false;
    //     }
    //   });
      

    // });

    number01_marker.addMarkerFoundEventListener(() => {
      alert('見つけた');
    });
    number02_marker.addMarkerFoundEventListener(() => {
      alert('見つけた');
    });
    
    number01_marker.addMarkerLostEventListener(() => {
      alert('見失った');
    });


  }
}

export default new Nazo03();