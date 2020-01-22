const knex = require('../db');

const joinGameSelect = [
  'room.id', 'room.name', 'room.description', 'room.language',
  'game.komi', 'game.handicap', 'game.board_size', 
  'game.player_black', 'game.player_white',
  'game.player_black_rank', 'game.player_white_rank'
]

const findPublicRooms = async () => {
  return await knex('room')
  .where('private', false)
  .select(['id', 'name', 'description', 'language']);
}

const findRoomById = async (roomId) => {
  
  return await knex
  .from('room')
  .select(joinGameSelect)
  .where('room.id', '=', roomId)
  .join('game', function() {
    this.on('game.room', '=', 'room.id')
  })
}

module.exports = {
  findPublicRooms,
  findRoomById
}