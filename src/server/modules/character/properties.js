export class Properties {
    constructor(playerSocialClubName) {
        this.group = 1;
        this.password = 'testpassword';
        this.age = 0;
        this.lastDead = 123;

        this.inventory = {};
        
        this.lastPosition = {
            x, y, z, rotation
        }

        this.thirst = 100;
        this.hunger = 100;

        this.isBleeding = false;
        this.isSprinting = false;
        this.isAuthorize = false;
    }

    get() {
        return {
            group: this.group,
            password: this.password,
            age: this.age,
            lastDead: this.lastDead,
            inventory: this.inventory,
            thirst: this.thirst,
            hunger: this.hunger,
            isBleeding: this.isBleeding,
            isSprinting: this.isSprinting,
            isAuthorize: this.isAuthorize
        }
    }
}
