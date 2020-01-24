const knex = require('../db');

const gameOverviewSelect = [
  'id', 'board_size', 'komi', 'handicap', 
  'player_black', 'player_black_rank', 'player_white', 'player_white_rank'
]

const findGameById = async (gameId) => {
  const game = await knex('game')
  .where({'id': gameId})
  .select('*');

  return game;
}

const findGameByRoom = async (roomId) => {
  const games = await knex('game')
  .where({'room': roomId})
  .select(gameOverviewSelect);
  
  return games;
}

const insertGame = async (game) => {

}

module.exports = {
  findGameById,
  findGameByRoom,
  insertGame
}