const knex = require('knex');
const knexConfig = require('../knexConfig');


const env = process.env.NODE_ENV || 'development';
const configOptions = knexConfig[env];

module.exports = knex(configOptions);