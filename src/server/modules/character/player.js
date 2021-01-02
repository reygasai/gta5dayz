import { Properties } from "./properties";

export class Player {
    constructor(player) {
        this.player = player;
    }

    init() {
        this.getProperties();
    }

    async getProperties() {
        await new Properties().player(this.player.name).get();
    }
}