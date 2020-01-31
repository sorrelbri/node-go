const gameServices = require('../services/gameServices');

describe('game services', () => {
  it('games services persists game data', done => {
    gameServices.placeMove({id: 1}, {player: 'black', move: '3,3'})
    console.log(gameServices.getAllGames())
    done();
  });
  
  it('init game returns game board', done => {
    gameServices.initGame({id: 1})
    console.log(gameServices.getBoard(1))
    done();
  })
})