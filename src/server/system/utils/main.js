export class Utils {
    static playerAlert(player, eventName, message, type) {
        let callJsonStr = JSON.stringify({
            type: type,
            message: message
        });

        player.call(eventName, [callJsonStr]);
    }
}