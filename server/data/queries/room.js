const knex = require('../db');

const findPublicRooms = async () => {
  return await knex('room')
  .where('private', false)
  .select(['id', 'name', 'description', 'language']);
}

module.exports = {
  findPublicRooms
}