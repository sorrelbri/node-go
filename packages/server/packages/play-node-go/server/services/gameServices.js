const Game = require('./Game').Game;

const gamesInProgress = { }

const storeGame = (game) => {
  gamesInProgress[game.id] = new Game(game);
}

const initGame = (game) => {
  gamesInProgress[game.id] = new Game(game)
  return gamesInProgress[game.id].initGame();
}

const makeMove = (game, move) => {
  const newState = gamesInProgress[game.id].makeMove(move);
  return {...newState}
}

const getBoard = (gameId) => {
  return gamesInProgress[gameId].getBoardState();
}

const getAllGames = () => {
  return gamesInProgress;
}

module.exports = {
  makeMove,
  getAllGames,
  getBoard,
  initGame
}