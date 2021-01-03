import Knex from 'knex';
const config = require("./config").config; 

export const DBTables = config.tables;
export const Database = Knex({
    client: config.client,
    connection: {
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,

        migrations: {
            tableName: config.migrationTable
        }
    }
});