const roomQueries = require('../../data/queries/room');
const messageQueries = require('../../data/queries/message');
const gameQueries = require('../../data/queries/game');
const {enableRoomSocket} = require('../../socket');

const getAll = async (req, res, next) => {
  try {
    const publicRooms = await roomQueries.findPublicRooms();
    
    res.status(200).json({rooms: [...publicRooms]})
  }

  catch (err) {
    res.status(500).json(err);
  }
}

const show = async (req, res, next) => {
  try {
    const roomId = req.params.id;
    if (!roomId) throw('missing room parameter')
    
    // TODO eventually add check for user's private rooms
    enableRoomSocket(roomId);

    const currentRoom = await roomQueries.findRoomById(roomId);
    const messages = await messageQueries.findMessageByRoom(roomId);
    const roomGames = await gameQueries.findGameByRoom(roomId);
    const body = {currentRoom, messages, roomGames};
    res.status(200).json(body);
  }
  catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAll,
  show
}