import { Config } from "../world/config";

export default class Properties {
    constructor() {
        this.name;
        this.email;
        this.password;
        this.group;

        this.heal;
        this.armour;
        this.thirst;
        this.hunger;
        
        this.isBleeding;
        
        this.lastDead;
        this.lastSpawn;
        
        this.x;
        this.y;
        this.z;
        this.rotation;
        
        this.isAuthorize = true;

        this.alpha = 255;
    }

    getRandomSpawnpoint() {
        let randomKey = Math.floor(Math.random() * Math.floor(Object.keys(Config.playerSpawnPoints).length));
        return Config.playerSpawnPoints[randomKey];
    }

    setDefaultProperties(isPlayerSpawn = false) {
        this.heal = 100;
        this.armour = 0;
        this.thirst = 100;
        this.hunger = 100;
        this.lastSpawn = Date.now();
        
        this.isAuthorize = true;

        if(isPlayerSpawn) {
            this.lastDead = Date.now();
            
            let randomPosition = this.getRandomSpawnpoint();
            this.x = parseFloat(randomPosition.x);
            this.y = parseFloat(randomPosition.y);
            this.z = parseFloat(randomPosition.z);
            this.rotation = 0;
        }

        return this;
    }

    getProperties(properties) {
        this.name = properties.name
        this.email = properties.email;
        this.password = properties.password;
        this.group = properties.group;

        this.heal = (properties.heal > 100) ? 100 : properties.heal;
        this.armour = (properties.armour > 100) ? 100 : properties.armour;
        this.thirst = (properties.thirst > 100) ? 100 : properties.thirst;
        this.hunger = (properties.hunger > 100) ? 100 : properties.hunger;
        
        this.isBleeding = Boolean(properties.is_bleeding);
        
        this.lastDead = properties.last_dead;
        this.lastSpawn = properties.last_spawn;
        
        this.x = parseFloat(properties.x);
        this.y = parseFloat(properties.y);
        this.z = parseFloat(properties.z);
        this.rotation = parseFloat(properties.rotation);
        
        this.isAuthorize = true;

        return this;
    }

    setDataPlayer(player) {
        //Обернуть в Promise и ловить ошибки
        if(player) {
            player.name = this.name;
            player.email = this.email;
            player.password = this.password;
            player.group = this.group;
            
            player.heal = this.heal;
            player.armour = this.armour;
            player.thirst = this.thirst;
            player.hunger = this.hunger;

            player.isBleeding = this.isBleeding

            player.lastDead = this.lastDead;
            player.lastSpawn = this.lastSpawn;

            player.spawn(new mp.Vector3(this.x, this.y, this.z));

            player.alpha = this.alpha;
        }
    }

    saveDataPlayer(player) {

    }

    updateDataPlayer(player) {

    }
}