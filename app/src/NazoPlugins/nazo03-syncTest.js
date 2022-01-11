
class Nazo03SyncTest {
  constructor(){}
  
  init(engine){
    const syncedAreaAnchorMarker = engine.setSyncedAreaAnchor('./assets/share_marker.patt');
    const pl1Marker = engine.registerSyncedMarker('nazo03st-player1-marker', './assets/nazo03/syncTest/pattern-Player1.patt');
    const pl2Marker = engine.registerSyncedMarker('nazo03st-player2-marker', './assets/nazo03/syncTest/pattern-Player2.patt');
    engine.registerAsset('nazo03st-player1-img', 'image', './assets/nazo03/syncTest/Player_image_1.png');
    engine.registerAsset('nazo03st-player2-img', 'image', './assets/nazo03/syncTest/Player_image_2.png');
    engine.createEntity('nazo03st-pl1-ent', 'nazo03st-player1-img', pl1Marker.id);
    engine.createEntity('nazo03st-pl2-ent', 'nazo03st-player2-img', pl2Marker.id);
  }
}

export default new Nazo03SyncTest();