const Game = require('./Game').Game;
const moveQueries = require('../data/queries/move');

const gamesInProgress = { }

const storeGame = (game) => {
  gamesInProgress[game.id] = Game(game);
  return gamesInProgress[game.id];
}

const initGame = ({id, gameRecord = [], ...gameData}) => {
  if (gamesInProgress[id]) return getDataForUI(id);
  if (gameRecord.length) {
    console.log('here')
    gamesInProgress[id] = Game({ gameData, gameRecord })
  }
  else {
    gamesInProgress[id] = Game({gameData}).initGame();
  }
  return getDataForUI(id)
}

const makeMove = async ({id, move}) => {
  if (!gamesInProgress[id]) storeGame({id}).initGame();
  gamesInProgress[id] = gamesInProgress[id].makeMove(move)
  if (gamesInProgress[id].success === false) return { message: 'illegal move' };
  const priorMove = gamesInProgress[id].gameRecord.length;
  const moveInsert = { gameId: id, player: move.player, x: move.pos.x, y: move.pos.y, gameRecord: true, priorMove };
  let moveDbResult;
  try {
    moveDbResult = await moveQueries.addMove(moveInsert);
  }
  catch {
    gamesInProgress[id].returnToMove(-1);
  } finally {
    return getDataForUI(id);
  }
}

const getDataForUI = (id) => {
  return {
    board: gamesInProgress[id].legalMoves,
    ...gamesInProgress[id].getMeta()
  };
}

const dropGame = (id) => {
  return { message: 
    `${delete gamesInProgress[id]}`
  }
}

const getAllGames = () => {
  return gamesInProgress;
}

module.exports = {
  makeMove,
  getAllGames,
  getDataForUI,
  initGame,
  dropGame
}
