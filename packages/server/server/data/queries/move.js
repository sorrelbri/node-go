const knex = require('../db');

const findGameRecord = async (gameId) => {
  return await knex('move')
  .where({'game': gameId, 'game_record': true})
  .select('*');
}

module.exports = {
  findGameRecord
}