const users = {
    name: "users",
    colums: {
        id: "id",
        name: "name",
        email: "email",
        password: "password",
        group: "group",
        thirst: "thirst",
        hunger: "hunger",
        isBleeding: "is_bleeding",
        isSprinting: "is_sprinting",
        lastDead: "last_dead",
        lastSpawn: "last_spawn",
        x: "x",
        y: "y",
        z: "z",
        rotation: "rotation",
        inventory: "inventory"
    }
};

const tables = {
    users: users
}

const config = {
    client: 'mysql',
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ragemp',
    migrationTable: 'migrations',
    tables: tables
};

module.exports = {config, tables, users};