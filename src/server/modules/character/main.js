import { Player } from "./player";

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