import { Properties } from "./properties";

export class Player {
    constructor(player) {
        this.player = player;
    }

    init() {
        this.setProperties();
    }

    setProperties() {
        let properties = new Properties(this.player.socialClub);

        for(var property in properties) {
            this.player[property] = properties[property]; 
        }
    }
}