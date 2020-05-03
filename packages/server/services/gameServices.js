const Game = require('./Game').Game;

const gamesInProgress = { }

const storeGame = (game) => {
  gamesInProgress[game.id] = Game(game);
}

const initGame = ({id, gameRecord = [], ...gameData}) => {
  gamesInProgress[id] = Game({ gameData, gameRecord })
  gamesInProgress[id].initGame();
  return getDataForUI(id)
}

const makeMove = ({id, move}) => {
  if (!gamesInProgress[id]) return { message: 'no game'};
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

const getAllGames = () => {
  return gamesInProgress;
}

module.exports = {
  makeMove,
  getAllGames,
  getDataForUI,
  initGame
}
