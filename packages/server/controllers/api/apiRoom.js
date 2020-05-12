const roomQueries = require('../../data/queries/room');
const messageQueries = require('../../data/queries/message');
const gameQueries = require('../../data/queries/game');
const socket = require('../../socket');

const getAll = async (req, res, next) => {
  try {
    const publicRooms = await roomQueries.findPublicRooms();
    
    res.status(200).json({rooms: [...publicRooms]})
  }

  catch (e) {
    console.log(e)
    res.status(500).json(e);
  }
}

const show = async (req, res, next) => {
  try {
    const roomId = req.params.id;
    if (!roomId) throw('missing room parameter')
    
    // TODO eventually add check for user's private rooms

    const currentRoom = await roomQueries.findRoomById(roomId);
    const messages = await messageQueries.findMessageByRoom(roomId);
    const roomGames = await gameQueries.findGameByRoom(roomId);
    const body = {currentRoom, messages, roomGames};
    res.status(200).json(body);
  }
  catch (e) {
    console.log(e)
    res.status(500).json(e);
  }
}

module.exports = {
  getAll,
  show
}