export class Player {
    init() {
        this.showMap();
        this.debugPlayer();
    }

    showMap() {
        mp.game.ui.setMinimapVisible(true);
        mp.game.ui.displayRadar(false);
    }

    debugPlayer() {
        let debugText = '';
        
        mp.events.add("renderDebug", (debugData) => {
            debugText = `name: ${debugData.player}\n~o~ x: ${debugData.x}\n~o~y: ${debugData.y}\n~o~z: ${debugData.z}`; 
        });
        
        mp.events.add('render', () => {
            mp.game.graphics.drawText(debugText, [0.88, 0.16], {font: 4,color: [255,255,255,255], scale: [0.5,0.5], outline: false});
        });
    }
}