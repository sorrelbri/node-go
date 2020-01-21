const knex = require('../db');

// TODO timestamps

const findMessageByRoom = async (roomId) => {
  return await knex('message')
  .where({'id': roomId})
  .select('*');
}

module.exports = {
  findMessageByRoom
}