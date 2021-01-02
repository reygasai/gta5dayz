import { Database, DBTables as Table } from "../../system/database/main";

export class Properties {
    constructor() {
        this.p;

        this.group;
        this.age;

        this.lastDead;

        this.inventory = {};

        this.thirst = 100;
        this.hunger = 100;

        this.isBleeding = false;
        this.isSprinting = false;
    }

    player(player) {
        this.p = player;
        return this;
    }

    async get() {
        try {
            let data = await Database.select('*').from(Table.users.name).where(Table.users.colums.name, '=', this.p).limit(1);
            console.log(data);
        } catch(error) {
            console.error(error);
        } 
    }

    save() {

    }
}