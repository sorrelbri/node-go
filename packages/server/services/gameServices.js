const Game = require('./Game').Game;

const gamesInProgress = { }

const storeGame = (game) => {
  gamesInProgress[game.id] = Game(game);
}

const initGame = ({id, gameRecord = [], ...gameData}) => {
  if (gamesInProgress[id]) return getDataForUI(id);
  gamesInProgress[id] = Game({ gameData, gameRecord })
  gamesInProgress[id].initGame();
  return getDataForUI(id)
}

const makeMove = ({id, move}) => {
  // console.log(id, move)
  // console.log(gamesInProgress[id])
  if (!gamesInProgress[id]) storeGame({id});
  gamesInProgress[id] = gamesInProgress[id].makeMove(move)
  if (gamesInProgress[id].success === false) return { message: 'illegal move' };
  return getDataForUI(id)
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
