class Chat {
    init() {
        this.registerEvents();
    }

    registerEvents() {
        mp.events.add("playerChat", this.sendMessage);
    }

    sendMessage(player, text) {
        if(player === undefined) {
            return;
        }
        
        let message = `${player.name}: ${text}`;
        player.call("newChatMessage", [message]);
    }
}

export const chat = new Chat;