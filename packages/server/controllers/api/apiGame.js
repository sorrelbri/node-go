const roomQueries = require('../../data/queries/room');
const messageQueries = require('../../data/queries/message');
const gameQueries = require('../../data/queries/game');
const moveQueries = require('../../data/queries/move');

const show = async (req, res, next) => {
  try {
    const gameId = req.params.id;
    if (!gameId) throw('missing game parameter')
    
    // TODO Promise.all()
    const game = await gameQueries.findGameById(gameId);    
    const record = await moveQueries.findGameRecord(gameId);
    res.status(200).json({game, record})
  }
  catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  show
}