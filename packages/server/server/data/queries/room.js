const knex = require('../db');

const roomSelect = [
  'id', 'name', 'description', 'language',
]

const findPublicRooms = async () => {
  return await knex('room')
  .where('private', false)
  .select(roomSelect);
}

const findRoomById = async (roomId) => {
  const results = await knex
  .from('room')
  .select(roomSelect)
  .where('room.id', roomId)

  return results[0]
}

module.exports = {
  findPublicRooms,
  findRoomById
}