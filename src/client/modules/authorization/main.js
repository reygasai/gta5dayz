export class Authorization {
    constructor() {
        this.mainPane;
        this.authCamera;
    }

    init() {
        this.registerEvents();
    }

    registerEvents() {
        mp.events.add({
            "SERVER::Authorization.Camera": this.cameraController.bind(this),
            "CEF::Authorization.SendAuthData": this.sendAuthData,
            "SERVER::Authorization.DisplayError": this.notice.bind(this) 
        });
    }

    sendAuthData(data) {
        mp.events.callRemote("CLIENT::Authorization.SendAuthData", data);
    }

    notice(data) {
        let jsonData = JSON.parse(data);
        this.mainPane.execute(`document.authUI.notify("${jsonData.message}");`);
    }

    cameraController(position, create = true) {
        const dataPosition = JSON.parse(position);
        
        position = {
            x: parseFloat(dataPosition.x),
            y: parseFloat(dataPosition.y),
            z: parseFloat(dataPosition.z),
        }

        if(create) {
            mp.players.local.freezePosition(true);

            this.authCamera = mp.cameras.new('default', 
                new mp.Vector3(position.x, position.y, position.z), 
                new mp.Vector3(0, 0, 0), 40);
            
            this.authCamera.pointAtCoord(position.x, position.y / 2, position.z);

            this.authCamera.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 0, true, false);

            this.paneController(true);
        } else {
            mp.game.cam.renderScriptCams(false, false, 0, true, false);
            this.authCamera.destroy();
            this.paneController(false);
            mp.players.local.freezePosition(false);
        }
    }

    paneController(display = true) {
        if(display) {
            this.mainPane = mp.browsers.new('package://ui/templates/authorization/index.html');
        } else {
            this.mainPane.destroy();
        }
        
        mp.gui.cursor.show(display, display);
    }
}