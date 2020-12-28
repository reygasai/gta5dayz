export default class Test {
    constructor() {
        console.log('Load test!');
    }

    init() {
        mp.events.addCommand('hp', (player) => {
            player.health = 10;
        });
    }
}