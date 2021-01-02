const config = require("./src/server/system/database/config").config;

module.exports = {
  development: {
    client: config.client,
    connection: {
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    },

    migrations: {
      tableName: config.migrationTable
    }
  },

  staging: {
    client: config.client,

    connection: {
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    },

    migrations: {
        tableName: config.migrationTable
    }
  },

  production: {
    client: config.client,
    connection: {
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    },

    migrations: {
      tableName: config.migrationTable
    }
  }
};