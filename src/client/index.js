mp.events.add("newChatMessage", (message) => {
    mp.gui.chat.push(message);
});

mp.game.ui.setMinimapVisible(true);
mp.game.ui.displayRadar(false);

let debugText = '';

mp.events.add("renderDebug", (debugData) => {
    debugText = `name: ${debugData.player}\n~o~ x: ${debugData.x}\n~o~y: ${debugData.y}\n~o~z: ${debugData.z}`; 
});

mp.events.add('render', () => {
    mp.game.graphics.drawText(debugText, [0.88, 0.16], {font: 4,color: [255,255,255,255], scale: [0.5,0.5], outline: false});
});

/*
mp.events.add('render', () => {
    let position = pos = mp.players.local.getCoords(true);
    
    mp.game.graphics.drawLine(position.x, position.y, position.z,
                              position.x, position.y + 2, position.z + 0.5, 0, 0, 255, 255);
});
*/