const knex = require('../db');

const gameDetailSelect = [
  'game.id', 'application', 'application_version',
  'board_size', 'komi', 'handicap', 'open', 'win_type',
  'player_black', 'player_black_rank', 'player_white', 'player_white_rank',
  'captures_black', 'captures_white', 'score', 'win_type',
  'description', 'event', 'round', 'name', 'room'
]

const timeSettingSelect = [
  'main_time', 'time_period', 'period_length', 'overtime', 'overtime_period', 'overtime_length'
]

const gameOverviewSelect = [
  'id', 'board_size', 'komi', 'handicap', 'open', 'win_type',
  'player_black', 'player_black_rank', 'player_white', 'player_white_rank'
]

const findGameById = async function (gameId) {
  const selection = gameDetailSelect.concat(timeSettingSelect);

  const game = await knex
  .from('game')
  .select(selection)
  .where({'game.id': gameId})
  .leftJoin('time_setting', function() { this.on('time_setting.id', '=', 'game.time_setting')})
  
  return game[0];
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