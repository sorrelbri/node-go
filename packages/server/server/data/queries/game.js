const knex = require('../db');

const findGameById = async (gameId) => {
  return await knex('game')
  .where({'id': gameId})
  .select('*');
}

const findGameByRoom = async (roomId) => {
  return await knex('game')
  .where({'id': roomId})
  .select('*');
}

const insertGame = async (game) => {

}

module.exports = {
  findGameById,
  findGameByRoom,
  insertGame
}