const Game = require('./Game').Game;

const gamesInProgress = { }

const storeGame = (game) => {
  gamesInProgress[game.id] = new Game(game);
}

const initGame = (game) => {
  gamesInProgress[game.id] = new Game(game)
  return gamesInProgress[game.id].initGame();
}

const placeMove = (game, move) => {
  if (!gamesInProgress[game]) {
    gamesInProgress[game] = storeGame(game)
  }
  // gamesInProgress[]
  let meta = {};
  // let newBoard = {...board};
  let board = [];
  return {board, meta}
}

const getBoard = (gameId) => {
  return gamesInProgress[gameId].getBoardState();
}

const getAllGames = () => {
  return gamesInProgress;
}

module.exports = {
  placeMove,
  getAllGames,
  getBoard,
  initGame
}