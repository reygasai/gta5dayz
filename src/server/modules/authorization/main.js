import { Config } from "./config";
import Properties from "../character/properties";
import Auth from "./auth";

export default class Authorization {
    init() {
        this.registerEvents();
        this.authHandler = new Auth;
    }

    registerEvents() {
        mp.events.add({
            "playerReady": this.readyPlay,
            "CLIENT::Authorization.SendAuthData": this.auth.bind(this),
            "CLIENT::Authorization.SendRegisterData": this.register
        });
    }

    readyPlay(player) {
        player.position = new mp.Vector3(parseFloat(Config.startedCamPosition.x), parseFloat(Config.startedCamPosition.y), parseFloat(Config.startedCamPosition.z));
        player.call("SERVER::Authorization.Camera", [JSON.stringify(Config.startedCamPosition), true]);
        player.alpha = 0;
    }

    async auth(player, data) {
        let authResult = await this.authHandler.authorize(player, data);
        if(Object.keys(authResult).length > 0) {
            this.loadCharacterProperties(player, authResult);
            player.call("SERVER::Authorization.Camera", [JSON.stringify({}), false]);
        }
    }

    register() {
        
    }

    loadCharacterProperties(player, data) {
        let setProperties = new Properties().getProperties(data).setDataPlayer(player);
        //character.setProperties(data);
    }
}