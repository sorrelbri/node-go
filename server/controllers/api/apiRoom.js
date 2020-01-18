// const roomQueries = require('../../data/queries/room');

const roomIndex = async (req, res, next) => {
  try {
    // TODO eventually add check for user's private rooms
    

    res.status(200).json({rooms: [{id: 1, name: 'main', description: 'A general place to play Go'}]})
  }

  catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  roomIndex
}