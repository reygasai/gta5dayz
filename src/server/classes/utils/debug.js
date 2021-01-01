export default class Debug {
    constructor() {
        this.enable = false;
    }

    init() {
        this.registerEvents();
    }

    registerEvents() {
        mp.events.addCommand('debug', (player) => {
            return this.displayDebug(player, this)
        });

        mp.events.addCommand('player', this.playerInfo);
    }

    playerInfo(player) {
        console.log(player);
    }

    displayDebug(player, _this) {
        _this.enable = !_this.enable;
        
        var sendDataUpdater = setInterval(() => {
            let data = {
                player: player.name,
                x: player.position.x,
                y: player.position.y,
                z: player.position.z,
            }

            player.call("renderDebug", [data]);      
        }, 2000);

        if(!_this.enable) {
            clearInterval(sendDataUpdater);
        }
    }
}