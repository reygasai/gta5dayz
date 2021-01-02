import { Player } from "./player";
import { Properties } from "./properties";

export class Character {
    init() {
        this.registerEvents();
    }

    registerEvents() {
        mp.events.add("playerReady", (player) => {
            let mpPlayer = new Player(player);
            mpPlayer.init();
        });
    }
}