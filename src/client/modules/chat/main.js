export class Chat {
    init() {
        mp.events.add("newChatMessage", (message) => {
            mp.gui.chat.push(message);
        });        
    }
}