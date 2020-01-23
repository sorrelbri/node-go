const knex = require('../db');

const gameOverviewSelect = [
  'id', 'board_size', 'komi', 'handicap', 
  'player_black', 'player_black_rank', 'player_white', 'player_white_rank'
]

const findGameById = async (gameId) => {
  return await knex('game')
  .where({'id': gameId})
  .select('*');
}

const findGameByRoom = async (roomId) => {
  return await knex('game')
  .where({'id': roomId})
  .select(gameOverviewSelect);
}

const insertGame = async (game) => {

}

module.exports = {
  findGameById,
  findGameByRoom,
  insertGame
}