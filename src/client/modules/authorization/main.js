export class Authorization {
    constructor() {
        this.pane;
        this.display = false;
    }

    init() {
        this.paneController();
        this.registerEvents();
    }

    registerEvents() {
        mp.events.add("CEF::Auth.SendAuthorizeData", (jsonData) => {
            mp.events.callRemote("CLENT::Auth.SendAuthorizeData", jsonData);
        });

        mp.events.add("SERVER::Auth.ErrorSendedData", (jsonData) => {
            let data = JSON.parse(jsonData);
            this.notice(data.message);
        });
    }

    notice(message) {
        this.pane.execute(`document.authUI.notify("${message}");`);
    }

    paneController() {
        mp.keys.bind(0x46, true, () => {
            if(!this.display) {
                this.pane = mp.browsers.new('package://ui/templates/authorization/index.html');
            } else {
                this.pane.destroy();
            }

            this.display = !this.display;
            mp.gui.cursor.show(this.display, this.display);
        });
    }
}