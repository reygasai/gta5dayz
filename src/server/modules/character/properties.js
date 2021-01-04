import { Database, DBTables } from "../../system/database/main";

export class Properties {
    constructor() {
        this._p;
        this._id;

        this.name;
        this.email = 'admin@ya.ru';
        this.password = 'testpassword';
        this.group = 1;

        this.thirst = 100;
        this.hunger = 100;

        this.isBleeding = false;
        this.isSprinting = false ;

        this.lastDead = 1;
        this.lastSpawn = 1;

        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.rotation = 0;

        this.inventory = {};
    }

    player(player) {
        this._p = player;
        return this;
    }

    async get() {
        let table = DBTables.users;
        
        try {
            let data = await Database.select('*').from(table.name).where(table.colums.name, '=', this._p).limit(1);
            //console.log(data.length);

            if(data.length == 0) {
                let data = await Database(table.name).insert({
                    name: this._p,
                    email: this.email,
                    password: this.password,
                    group: this.group,
                    thirst: this.thirst,
                    hunger: this.hunger,
                    is_bleeding: this.isBleeding,
                    is_sprinting: this.isSprinting,
                    last_dead: this.lastDead,
                    last_spawn: this.lastSpawn,
                    x: this.x,
                    y: this.y,
                    z: this.z,
                    rotation: this.rotation,
                    inventory: '{}'
                });
            } else {
                //console.log(data);
            }

        } catch(error) {
            console.error(error);
        } 
    }

    save() {

    }
}