// Update with your config settings.
require('dotenv').config()

module.exports = {

  development: {
    client: 'postgresql',
    connection: process.env.PG_CONNECTION_STRING
  },

  staging: {
    client: 'postgresql',
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
    pool: {
      min: 2,
      max: 10
    }
  }

};
