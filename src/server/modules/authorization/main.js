import { Config } from "./config";
import { Auth } from "./auth";

//После работы - удалить через delete
export class Authorization {
    init() {
        this.registerEvents();

        this.authHandler = new Auth;
    }

    registerEvents() {
        mp.events.add({
            "playerReady": this.readyPlay.bind(this),
            "CLIENT::Authorization.SendAuthData": this.auth,
            "CLIENT::Authorization.SendRegisterData": this.register
        });
    }

    readyPlay(player) {
        player.position = new mp.Vector3(parseFloat(Config.startedCamPosition.x), parseFloat(Config.startedCamPosition.y), parseFloat(Config.startedCamPosition.z));
        player.call("SERVER::Authorization.Camera", [JSON.stringify(Config.startedCamPosition), true]);
        player.alpha = 0;
    }

    auth(player, data) {
        const authResult = this.authHandler.authorize(player, data);
    }

    register() {

    }

    createCharacter(...options) {

    }
}