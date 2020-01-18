const roomQueries = require('../../data/queries/room');

const roomIndex = async (req, res, next) => {
  try {
    // TODO eventually add check for user's private rooms
    const publicRooms = await roomQueries.findPublicRooms();
    res.status(200).json({rooms: publicRooms})
  }

  catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  roomIndex
}