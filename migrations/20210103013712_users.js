
const _table = require("../src/server/system/database/config").users;

exports.up = function(knex) {
    return knex.schema.createTable(_table.name, (table) => {
        let column = _table.colums; 

        table.increments(column.id).primary();
        table.string(column.name, 120).unique().notNullable();
        table.string(column.email, 255).unique().notNullable();
        table.string(column.password, 255).notNullable();
        table.integer(column.group, 2).notNullable();

        table.integer(column.heal, 3).notNullable();
        table.integer(column.armour, 3).notNullable();
        table.integer(column.thirst, 3).notNullable();
        table.integer(column.hunger, 3).notNullable();

        table.boolean(column.isBleeding).notNullable();

        table.integer(column.lastDead, 255).notNullable();
        table.integer(column.lastSpawn, 255).notNullable();

        table.float(column.x).notNullable();
        table.float(column.y).notNullable();
        table.float(column.z).notNullable();
        table.float(column.rotation).notNullable();

        table.json(column.inventory).notNullable();
    });
};

exports.down = function(knex) {
  
};
