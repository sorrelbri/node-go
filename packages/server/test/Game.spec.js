const chai = require('chai');
const should = chai.should();
const { Game, Point } = require('../services/Game');

describe('Game', () => {
  it('smoke test Game()', done => {
    (typeof Game())
      .should.eql('object');
    done();
  });

  it('smoke test Point()', done => {
    (typeof Point({x: 1, y: 1}))
      .should.eql('object');
    done();
  });

  it('smoke test initGame()', done => {
    (typeof Game().initGame())
      .should.eql('object');
    done();
  });

  it('Get meta returns proper data for games with no record', done => {
    Game().getMeta()
      .should.eql(initialMeta);
    // Game().initGame().getMeta()
    //   .should.eql({ ...initialMeta, turn: 1 });
    done();
  });
});

describe('Game().initGame() returns legalMoves', () => {
  it('initGame() returns default 19x19', done => {
    Game().initGame()
      .legalMoves.should.eql(emptyBoard);
    done();
  });
  
  it('initGame() with 2 handicap returns legalMoves with stones', done => {
    Game({gameData: { handicap: 2 }}).initGame()
      .legalMoves.should.eql({...emptyBoard, '4-16': 1, '16-4': 1});
    done();
  });

  it('handicap stone has proper liberties', done => {
    const game = Game({gameData: { handicap: 2 }}).initGame();
    const group = game.boardState['4-16'].group
    game.groups[group].liberties.size.should.eql(4);
    done();
  });

  it('initGame( 19x19 ) with all levels of handicap returns legalMoves with stones', done => {
    Game({gameData: { boardSize: 19, handicap: 2 }}).initGame()
      .legalMoves.should.eql({...emptyBoard, '4-16': 1, '16-4': 1 });
    Game({gameData: { boardSize: 19, handicap: 3 }}).initGame()
      .legalMoves.should.eql({...emptyBoard, '16-16': 1, '4-16': 1, '16-4': 1 });
    Game({gameData: { boardSize: 19, handicap: 4 }}).initGame()
      .legalMoves.should.eql({...emptyBoard, '4-4': 1, '16-16': 1, '4-16': 1, '16-4': 1 });
    Game({gameData: { boardSize: 19, handicap: 5 }}).initGame()
      .legalMoves.should.eql({...emptyBoard, '10-10': 1, '4-4': 1, '16-16': 1, '4-16': 1, '16-4': 1 });
    Game({gameData: { boardSize: 19, handicap: 6 }}).initGame()
      .legalMoves.should.eql({...emptyBoard, '10-4': 1, '4-10': 1, '4-4': 1, '16-16': 1, '4-16': 1, '16-4': 1 });
    Game({gameData: { boardSize: 19, handicap: 7 }}).initGame()
      .legalMoves.should.eql({...emptyBoard, '10-10': 1, '10-4': 1, '4-10': 1, '4-4': 1, '16-16': 1, '4-16': 1, '16-4': 1 });
    Game({gameData: { boardSize: 19, handicap: 8 }}).initGame()
      .legalMoves.should.eql({...emptyBoard, '16-10': 1, '10-4': 1, '10-16': 1, '4-10': 1, '4-4': 1, '16-16': 1, '4-16': 1, '16-4': 1 });
    Game({gameData: { boardSize: 19, handicap: 9 }}).initGame()
      .legalMoves.should.eql({...emptyBoard, '10-10': 1, '16-10': 1, '10-4': 1, '10-16': 1, '4-10': 1, '4-4': 1, '16-16': 1, '4-16': 1, '16-4': 1 });
    done();
  })

  it('initGame( 13x13) returns legalMoves', done => {
    Game({gameData: { boardSize: 13 }}).initGame()
      .legalMoves.should.eql(emptyBoard13);
    done();
  });
  
  it('initGame( 13x13 ) with all levels of handicap returns legalMoves with stones', done => {
    Game({gameData: { boardSize: 13, handicap: 2 }}).initGame()
      .legalMoves.should.eql({...emptyBoard13, '4-10': 1, '10-4': 1 });
    Game({gameData: { boardSize: 13, handicap: 3 }}).initGame()
      .legalMoves.should.eql({...emptyBoard13, '10-10': 1, '4-10': 1, '10-4': 1 });
    Game({gameData: { boardSize: 13, handicap: 4 }}).initGame()
      .legalMoves.should.eql({...emptyBoard13, '4-4': 1, '10-10': 1, '4-10': 1, '10-4': 1 });
    Game({gameData: { boardSize: 13, handicap: 5 }}).initGame()
      .legalMoves.should.eql({...emptyBoard13, '7-7': 1, '4-4': 1, '10-10': 1, '4-10': 1, '10-4': 1 });
    Game({gameData: { boardSize: 13, handicap: 6 }}).initGame()
      .legalMoves.should.eql({...emptyBoard13, '7-4': 1, '4-7': 1, '4-4': 1, '10-10': 1, '4-10': 1, '10-4': 1 });
    Game({gameData: { boardSize: 13, handicap: 7 }}).initGame()
      .legalMoves.should.eql({...emptyBoard13, '7-7': 1, '7-4': 1, '4-7': 1, '4-4': 1, '10-10': 1, '4-10': 1, '10-4': 1 });
    Game({gameData: { boardSize: 13, handicap: 8 }}).initGame()
      .legalMoves.should.eql({...emptyBoard13, '10-7': 1, '7-4': 1, '7-10': 1, '4-7': 1, '4-4': 1, '10-10': 1, '4-10': 1, '10-4': 1 });
    Game({gameData: { boardSize: 13, handicap: 9 }}).initGame()
      .legalMoves.should.eql({...emptyBoard13, '7-7': 1, '10-7': 1, '7-4': 1, '7-10': 1, '4-7': 1, '4-4': 1, '10-10': 1, '4-10': 1, '10-4': 1 });
    done();
  });

  it('initGame( 9x9 ) returns legalMoves', done => {
    Game({gameData: { boardSize: 9 }}).initGame()
      .legalMoves.should.eql(emptyBoard9);
    done();
  });

  it('initGame( 9x9 ) with all levels of handicap returns legalMoves with stones', done => {
    Game({gameData: { boardSize: 9, handicap: 2 }}).initGame()
      .legalMoves.should.eql({...emptyBoard9, '3-7': 1, '7-3': 1 });
    Game({gameData: { boardSize: 9, handicap: 3 }}).initGame()
      .legalMoves.should.eql({...emptyBoard9, '7-7': 1, '3-7': 1, '7-3': 1 });
    Game({gameData: { boardSize: 9, handicap: 4 }}).initGame()
      .legalMoves.should.eql({...emptyBoard9, '3-3': 1, '7-7': 1, '3-7': 1, '7-3': 1 });
    done();
  });
});

describe('Game.makeMove({ player: str, pos: { x: int, y: int } })', () => {
  it('makeMove returns game object with proper board', done => {
    Game().initGame().makeMove({ player: 'black', pos: { x: 4, y: 4 } })
      .legalMoves.should.eql({ ...emptyBoard, '4-4': 1 });
    Game({ gameData: { handicap: 2 } }).initGame().makeMove({ player: 'white', pos: { x: 4, y: 4 } })
      .legalMoves.should.eql({ ...emptyBoard, '4-16': 1, '16-4': 1, '4-4': -1 });
    done();
  });
  
  it('makeMove returns success: false with move out of turn', done => {
    Game().initGame().makeMove({ player: 'white', pos: { x: 4, y: 4 } })
      .success.should.eql(false);
    Game({ gameData: { handicap: 2 } }).initGame().makeMove({ player: 'black', pos: { x: 4, y: 4 } })
      .success.should.eql(false);
    done();
  });

  it('makeMove returns success: false when move is at occupied point', done => {
    Game({ gameData: { handicap: 2 } }).initGame().makeMove({ player: 'white', pos: { x: 4, y: 16 } })
      .success.should.eql(false);
    done();
  });
  
  it('makeMove next to adjacent stone of the same color joins stones as a group', done => {
    const game = Game({ gameData: { handicap: 2 } }).initGame()   //     4        3  4
    .makeMove({ player: 'white', pos: { x: 4, y: 4 } })           // 14  1     4 -1 -1
    .makeMove({ player: 'black', pos: { x: 4, y: 15 }})           // 15  1     5    -1
    .makeMove({ player: 'white', pos: { x: 3, y: 4 } })           // 16  1h      
    .makeMove({ player: 'black', pos: { x: 4, y: 14 }})
    .makeMove({ player: 'white', pos: { x: 4, y: 5 }})
    
    const blackGroupKey = game.boardState['4-14'].group;
    const blackGroup = game.groups[blackGroupKey].stones;
    blackGroup.has(game.boardState['4-14']).should.eql(true);
    blackGroup.has(game.boardState['4-15']).should.eql(true);
    blackGroup.has(game.boardState['4-16']).should.eql(true);
    const whiteGroupKey = game.boardState['4-4'].group;
    const whiteGroup = game.groups[whiteGroupKey].stones;
    whiteGroup.has(game.boardState['4-4']).should.eql(true);
    whiteGroup.has(game.boardState['3-4']).should.eql(true);
    whiteGroup.has(game.boardState['4-5']).should.eql(true);
    done();
  });
  
  const noGroupGame = Game({ gameData: { handicap: 2 } }).initGame()    //     3  4 
    .makeMove({ player: 'white', pos: { x: 4, y: 15 } })                // 14     1
    .makeMove({ player: 'black', pos: { x: 4, y: 14 }})                 // 15  1 -1  no groups
    .makeMove({ player: 'white', pos: { x: 3, y: 16 } })                // 16 -1  1h
    .makeMove({ player: 'black', pos: { x: 3, y: 15 }});

  it('makeMove next to adjacent stone of different color does not join stones as a group', done => {
    const hoshiGroupKey = noGroupGame.boardState['4-16'].group;
    const hoshiGroup = noGroupGame.groups[hoshiGroupKey].stones;
    hoshiGroup.has(noGroupGame.boardState['4-16']).should.eql(true);
    hoshiGroup.has(noGroupGame.boardState['4-15']).should.eql(false);
    hoshiGroup.has(noGroupGame.boardState['3-14']).should.eql(false);
    hoshiGroup.has(noGroupGame.boardState['3-15']).should.eql(false);
    done();
  })

  it('makeMove next to adjacent stone of different color should yield proper liberties', done => {
    const hoshiGroup = noGroupGame.boardState['4-16'].group;
    const hoshiGroupLiberties = noGroupGame.groups[hoshiGroup].liberties;
    hoshiGroupLiberties.size.should.eql(2);
    const fourFifteen = noGroupGame.boardState['4-15'].group;
    const fourFifteenLiberties = noGroupGame.groups[fourFifteen].liberties;
    fourFifteenLiberties.size.should.eql(1);
    done();
  })

  it('makeMove returns success: false when move is made in point with no liberties', done => {
    const point = Game({ gameData: { handicap: 2 } }).initGame()                                                //    15 16 17
      .makeMove({ player: 'white', pos: { x: 4, y: 4 } }).makeMove({ player: 'black', pos: { x: 6, y: 16 } })   // 4      1
      .makeMove({ player: 'white', pos: { x: 16, y: 16 }}).makeMove({ player: 'black', pos: { x: 5, y: 15 } })  // 5   1  x  1
      .makeMove({ player: 'white', pos: { x: 16, y: 10 }}).makeMove({ player: 'black', pos: { x: 5, y: 17 } })  // 6      1
      .makeMove({ player: 'white', pos: { x: 5, y: 16 }})
      point.success.should.eql(false);
    done();
  });
});

describe('makeMove group join and basic capture logic', () => {
  const joinGame = Game().initGame()
    .makeMove({ player: 'black', pos: { x: 4, y: 17 } })    //     3  4  5
    .makeMove({ player: 'white', pos: { x: 3, y: 16 } })    // 15    -1
    .makeMove({ player: 'black', pos: { x: 5, y: 16 } })    // 16 -1  1  1
    .makeMove({ player: 'white', pos: { x: 4, y: 15 } })    // 17     1
    .makeMove({ player: 'black', pos: { x: 4, y: 16 } });
    
  it('gain liberties from group smoke test', done => {
    joinGame.success.should.eql(true);
    done();
  });

  it('stones in group have same group property', done => {
    joinGame.boardState['4-16'].group.should.eql(joinGame.boardState['5-16'].group);
    joinGame.boardState['4-16'].group.should.eql(joinGame.boardState['4-17'].group);
    joinGame.boardState['4-17'].group.should.eql(joinGame.boardState['4-16'].group);
    joinGame.boardState['4-17'].group.should.eql(joinGame.boardState['5-16'].group);
    joinGame.boardState['5-16'].group.should.eql(joinGame.boardState['4-17'].group);
    joinGame.boardState['5-16'].group.should.eql(joinGame.boardState['4-16'].group);
    done();
  })

  it('stones in group should have proper liberties', done => {
    const group = joinGame.boardState['4-16'].group;
    joinGame.groups[group]
      .liberties.size.should.eql(5);
    done();
  })

  it('group with only remaining liberty at point to be played returns success: false', done => {
    Game({ gameData: { handicap: 2 } }).initGame()
      .makeMove({ player: 'white', pos: { x: 4, y: 15 } })     //     3  4  5  6
      .makeMove({ player: 'black', pos: { x: 4, y: 4 } })      // 15    -1 -1
      .makeMove({ player: 'white', pos: { x: 5, y: 15 } })     // 16 -1  1h 0 -1
      .makeMove({ player: 'black', pos: { x: 16, y: 16 } })    // 17    -1 -1
      .makeMove({ player: 'white', pos: { x: 3, y: 16 } })
      .makeMove({ player: 'black', pos: { x: 4, y: 10 } })
      .makeMove({ player: 'white', pos: { x: 6, y: 16 } })
      .makeMove({ player: 'black', pos: { x: 10, y: 4 } })
      .makeMove({ player: 'white', pos: { x: 4, y: 17 } })
      .makeMove({ player: 'black', pos: { x: 10, y: 16 } })
      .makeMove({ player: 'white', pos: { x: 5, y: 17 } })
      .makeMove({ player: 'black', pos: { x: 5, y: 16 } })
      .success.should.eql(false);
    done();
  })

  const captureGame = () => Game({ gameData: { handicap: 2 } }).initGame()
    .makeMove({ player: 'white', pos: { x: 4, y: 15 } })    //     3  4  5
    .makeMove({ player: 'black', pos: { x: 4, y: 4 } })     // 15    -1
    .makeMove({ player: 'white', pos: { x: 3, y: 16 } })    // 16 -1  0 -1
    .makeMove({ player: 'black', pos: { x: 4, y: 10 } })    // 17    -1
    .makeMove({ player: 'white', pos: { x: 5, y: 16 } })    // 4,16 captured
    .makeMove({ player: 'black', pos: { x: 10, y: 4 } })
    
  it('makeMove capture smoke test', done => {
    captureGame().makeMove({ player: 'white', pos: { x: 4, y: 17 } })
      .success.should.eql(true);
    done();
  });

  it('makeMove assesses captures', done => {
    captureGame().boardState['4-17'].capturing[-1].size.should.eql(1);
    done();
  })

  it('makeMove capture removes captured stone', done => {
    captureGame().makeMove({ player: 'white', pos: { x: 4, y: 17 } })
      .boardState['4-16'].stone.should.eql(0);
    done();
  });
  
  it('makeMove capture increases capturing players captures', done => {
    captureGame().makeMove({ player: 'white', pos: { x: 4, y: 17 } })
      .playerState.wCaptures.should.eql(1);
    done();
  });

  const traceGame = () => Game().initGame()
    .makeMove({ player: 'black', pos: { x: 1, y: 1 } })   //    1  2  3
    .makeMove({ player: 'white', pos: { x: 1, y: 2 } })   // 1  1 -1  1
    .makeMove({ player: 'black', pos: { x: 2, y: 2 } })   // 2 -1  1
    .makeMove({ player: 'white', pos: { x: 2, y: 1 } })

  it('point at captured stone becomes liberty', done => {
    const game = traceGame();
    const group = game.boardState['1-2'].group;
    game.groups[group].liberties.has(game.boardState['1-1']).should.eql(true)
    done();
  })

  it('capture does not leave trace filled liberty', done => {
    traceGame()
      .makeMove({ player: 'black', pos: { x: 1, y: 3 } })
      .boardState['1-2'].stone.should.eql(-1);
    done();
  })

  const multiCaptureGame = () => Game().initGame()
    .makeMove({ player: 'black', pos: { x: 4, y: 17 } })
    .makeMove({ player: 'white', pos: { x: 3, y: 16 } })
    .makeMove({ player: 'black', pos: { x: 5, y: 16 } })
    .makeMove({ player: 'white', pos: { x: 4, y: 15 } })
    .makeMove({ player: 'black', pos: { x: 4, y: 16 } })
    .makeMove({ player: 'black', pos: { x: 4, y: 10 } })    //     3  4  5  6
    .makeMove({ player: 'white', pos: { x: 3, y: 17 } })    // 15    -1 -1
    .makeMove({ player: 'black', pos: { x: 10, y: 4 } })    // 16 -1  1  1 -1
    .makeMove({ player: 'white', pos: { x: 5, y: 15 } })    // 17 -1  1 -1
    .makeMove({ player: 'black', pos: { x: 10, y: 8 } })    // 18    -1
    .makeMove({ player: 'white', pos: { x: 4, y: 18} })
    .makeMove({ player: 'black', pos: { x: 3, y: 6 } })
    .makeMove({ player: 'white', pos: { x: 5, y: 17} })
    .makeMove({ player: 'black', pos: { x: 6, y: 3 } });
  
  it('smoke test multi stone group capture', done => {
    multiCaptureGame().makeMove({ player: 'white', pos: { x: 6, y: 16} })
      .success.should.eql(true);
    done();
  });
  
  it('multi stone group full group is in capturing', done => {
    const game = multiCaptureGame()
    const group = game.boardState['4-16'].group;
    game.boardState['6-16'].capturing[-1].has(group).should.eql(true);
    done();
  });
  
  it('multi stone group capture all points are 0', done => {
    const game = multiCaptureGame();
    game.makeMove({ player: 'white', pos: { x: 6, y: 16} });
    game.boardState['5-16'].stone.should.eql(0)
    game.boardState['4-16'].stone.should.eql(0)
    game.boardState['4-17'].stone.should.eql(0)
    done();
  });
  
  it('multi stone group capture scores points properly', done => {
    const game = multiCaptureGame();
    game.makeMove({ player: 'white', pos: { x: 6, y: 16} });
    game.playerState.wCaptures.should.eql(3);
    done();
  })
});

describe('capture logic: snapback, ko and playing in eyes', () => {
  it('playing in an eye formed by capture yields success: true', done => {
    Game().initGame()
      .makeMove({ player: 'black', pos: { x: 4, y: 4 } })     //    3  4  5
      .makeMove({ player: 'white', pos: { x: 5, y: 4 } })     // 4     1
      .makeMove({ player: 'black', pos: { x: 5, y: 5 } })     // 5  1 -1  1  
      .makeMove({ player: 'white', pos: { x: 16, y: 16 } })   // 6     1
      .makeMove({ player: 'black', pos: { x: 5, y: 3 } })     // (9) at {5, 4}
      .makeMove({ player: 'white', pos: { x: 16, y: 4 } })
      .makeMove({ player: 'black', pos: { x: 6, y: 4 } })
      .makeMove({ player: 'white', pos: { x: 4, y: 16 } })
      .makeMove({ player: 'black', pos: { x: 5, y: 4 } })
      .success.should.eql(true);
    done();
  });
  
  const snapbackGame = () => Game().initGame()
    .makeMove({ player: 'black', pos: { x: 4, y: 4 } })     //    3  4  5  6  7
    .makeMove({ player: 'white', pos: { x: 5, y: 4 } })     // 4     1  1 -1
    .makeMove({ player: 'black', pos: { x: 5, y: 6 } })     // 5  1 -1 -1  1 -1
    .makeMove({ player: 'white', pos: { x: 5, y: 7 } })     // 6     1  1 -1
    .makeMove({ player: 'black', pos: { x: 4, y: 5 } })     // (13) at {5,6}
    .makeMove({ player: 'white', pos: { x: 4, y: 6 } })
    .makeMove({ player: 'black', pos: { x: 5, y: 3 } })
    .makeMove({ player: 'white', pos: { x: 6, y: 6 } })
    .makeMove({ player: 'black', pos: { x: 6, y: 5 } })
    .makeMove({ player: 'white', pos: { x: 16, y: 16 } })
    .makeMove({ player: 'black', pos: { x: 6, y: 4 } })
    .makeMove({ player: 'white', pos: { x: 5, y: 5 } })
    .makeMove({ player: 'black', pos: { x: 5, y: 6 } });
    
  it('snapback functions properly', done => {
    snapbackGame()
      .success.should.eql(true);
    done();
  });

  const koGame = () => Game().initGame()
    .makeMove({ player: 'black', pos: { x: 4, y: 4 } })     //    3  4  5  6
    .makeMove({ player: 'white', pos: { x: 4, y: 5 } })     // 4     1 -1
    .makeMove({ player: 'black', pos: { x: 5, y: 3 } })     // 5  1 -1  1 -1
    .makeMove({ player: 'white', pos: { x: 5, y: 6 } })     // 6     1 -1
    .makeMove({ player: 'black', pos: { x: 6, y: 4 } })
    .makeMove({ player: 'white', pos: { x: 6, y: 5 } })
    .makeMove({ player: 'black', pos: { x: 5, y: 5 } })
    .makeMove({ player: 'white', pos: { x: 5, y: 4 } })

  it('ko recognized properly on Point', done => {
    koGame()
      .boardState['5-5'].ko.should.eql(true);
    done();
  })

  it('ko marked on Game object', done => {
    koGame().kos.should.eql(['5-5']);
    done();
  });

  it('ko marked in legalMoves', done => {
    koGame().legalMoves['5-5'].should.eql('k');
    done();
  }) 
  
  it('ko cleared on Point after move', done => {
    koGame().makeMove({ player: 'black', pos: { x: 16, y: 16 } })
      .makeMove({ player: 'white', pos: { x: 4, y: 16 } })
      .boardState['5-5'].ko.should.eql(false);
    done();
  });
  
  it('ko cleared on Game after move', done => {
    koGame().makeMove({ player: 'black', pos: { x: 16, y: 16 } })
      .makeMove({ player: 'white', pos: { x: 4, y: 16 } })
      .kos.should.eql([])
    done();
  });
  
  it('ko cleared on legalMoves after move', done => {
    koGame().makeMove({ player: 'black', pos: { x: 16, y: 16 } })
      .makeMove({ player: 'white', pos: { x: 4, y: 16 } })
      .legalMoves['5-5'].should.eql('l');
    done();
  });
});

describe('Game history functionality', () => {
  const firstMove =   { player: 'black', pos: { x: 4, y: 4 }};
  const secondMove =  { player: 'white', pos: { x: 16, y: 16 }};
  const thirdMove =   { player: 'black', pos: { x: 16, y: 4 } };
  const fourthMove =  { player: 'white', pos: { x: 4, y: 16 }};
  const fifthMove =   { player: 'black', pos: { x: 10, y: 4 } };
  const sixthMove =   { player: 'white', pos: { x: 4, y: 10 }};
  const seventhMove = { player: 'black', pos: { x: 10, y: 16 } };
  const eighthMove =  { player: 'white', pos: { x: 16, y: 10 }};

  it('makeMove creates gameRecord item', done => {
    Game().initGame()
      .makeMove(firstMove).gameRecord[0].should.eql(firstMove);
    done();
  });
  
  it('makeMove holds history', done => {
    const game = Game().initGame()
      .makeMove(firstMove).makeMove(secondMove);
    game.gameRecord[0].should.eql(firstMove);
    game.gameRecord[1].should.eql(secondMove)
    done();
  });

  const rewoundGame = () => Game().initGame()
    .makeMove(firstMove)
    .makeMove(secondMove)
    .makeMove(thirdMove)
    .returnToMove(-1);

  it('Game.returnToMove returns new Game with gameRecord', done => {
    rewoundGame()
      .gameRecord.should.eql([ firstMove, secondMove ])
    done();
  });
  
  it('Game.returnToMove returns new Game with new board state', done => {
    rewoundGame()
      .boardState['16-4'].stone.should.eql(0);
    rewoundGame()
      .boardState['4-4'].stone.should.eql(1);
    rewoundGame()
      .boardState['16-16'].stone.should.eql(-1);
    done();
  });

  const resetGame = () => [
    firstMove, secondMove, thirdMove, fourthMove, fifthMove, sixthMove, seventhMove, eighthMove
  ].reduce((game, move) => game.makeMove(move), Game().initGame());

  it('Game.returnToMove(0) returns to init board state', done => {
    const erasedGame = resetGame()
      .returnToMove(0)
    erasedGame.gameRecord.should.eql([])
    erasedGame.boardState['4-4'].stone.should.eql(0)
    done();
  });

  it('Game.returnToMove(5) returns to state after 5th move', done => {
    const fifthMoveGame = resetGame()
      .returnToMove(5);
    fifthMoveGame.gameRecord.should.eql([firstMove, secondMove, thirdMove, fourthMove, fifthMove]);
    fifthMoveGame.boardState['10-4'].stone.should.eql(1)
    fifthMoveGame.boardState['4-10'].stone.should.eql(0)
    done();
  })
})


const initialMeta = {
  winner: null, 
  turn: 0, 
  pass: 0,
  komi: 6.5,
  handicap: 0,
  boardSize: 19,
  playerState: {
    bCaptures: 0,
    wCaptures: 0,
    bScore: 0,
    wScore: 0
  }, 
  gameRecord: []
}

const emptyBoard9 = {
  '1-1': 'l','1-2': 'l','1-3': 'l','1-4': 'l','1-5': 'l','1-6': 'l','1-7': 'l','1-8': 'l','1-9': 'l',
  '2-1': 'l','2-2': 'l','2-3': 'l','2-4': 'l','2-5': 'l','2-6': 'l','2-7': 'l','2-8': 'l','2-9': 'l',
  '3-1': 'l','3-2': 'l','3-3': 'l','3-4': 'l','3-5': 'l','3-6': 'l','3-7': 'l','3-8': 'l','3-9': 'l',
  '4-1': 'l','4-2': 'l','4-3': 'l','4-4': 'l','4-5': 'l','4-6': 'l','4-7': 'l','4-8': 'l','4-9': 'l',
  '5-1': 'l','5-2': 'l','5-3': 'l','5-4': 'l','5-5': 'l','5-6': 'l','5-7': 'l','5-8': 'l','5-9': 'l',
  '6-1': 'l','6-2': 'l','6-3': 'l','6-4': 'l','6-5': 'l','6-6': 'l','6-7': 'l','6-8': 'l','6-9': 'l',
  '7-1': 'l','7-2': 'l','7-3': 'l','7-4': 'l','7-5': 'l','7-6': 'l','7-7': 'l','7-8': 'l','7-9': 'l',
  '8-1': 'l','8-2': 'l','8-3': 'l','8-4': 'l','8-5': 'l','8-6': 'l','8-7': 'l','8-8': 'l','8-9': 'l',
  '9-1': 'l','9-2': 'l','9-3': 'l','9-4': 'l','9-5': 'l','9-6': 'l','9-7': 'l','9-8': 'l','9-9': 'l'
}

const emptyBoard13 = {
  '1-1': 'l','1-2': 'l','1-3': 'l','1-4': 'l','1-5': 'l','1-6': 'l','1-7': 'l','1-8': 'l','1-9': 'l','1-10': 'l','1-11': 'l','1-12': 'l','1-13': 'l',
  '2-1': 'l','2-2': 'l','2-3': 'l','2-4': 'l','2-5': 'l','2-6': 'l','2-7': 'l','2-8': 'l','2-9': 'l','2-10': 'l','2-11': 'l','2-12': 'l','2-13': 'l',
  '3-1': 'l','3-2': 'l','3-3': 'l','3-4': 'l','3-5': 'l','3-6': 'l','3-7': 'l','3-8': 'l','3-9': 'l','3-10': 'l','3-11': 'l','3-12': 'l','3-13': 'l',
  '4-1': 'l','4-2': 'l','4-3': 'l','4-4': 'l','4-5': 'l','4-6': 'l','4-7': 'l','4-8': 'l','4-9': 'l','4-10': 'l','4-11': 'l','4-12': 'l','4-13': 'l',
  '5-1': 'l','5-2': 'l','5-3': 'l','5-4': 'l','5-5': 'l','5-6': 'l','5-7': 'l','5-8': 'l','5-9': 'l','5-10': 'l','5-11': 'l','5-12': 'l','5-13': 'l',
  '6-1': 'l','6-2': 'l','6-3': 'l','6-4': 'l','6-5': 'l','6-6': 'l','6-7': 'l','6-8': 'l','6-9': 'l','6-10': 'l','6-11': 'l','6-12': 'l','6-13': 'l',
  '7-1': 'l','7-2': 'l','7-3': 'l','7-4': 'l','7-5': 'l','7-6': 'l','7-7': 'l','7-8': 'l','7-9': 'l','7-10': 'l','7-11': 'l','7-12': 'l','7-13': 'l',
  '8-1': 'l','8-2': 'l','8-3': 'l','8-4': 'l','8-5': 'l','8-6': 'l','8-7': 'l','8-8': 'l','8-9': 'l','8-10': 'l','8-11': 'l','8-12': 'l','8-13': 'l',
  '9-1': 'l','9-2': 'l','9-3': 'l','9-4': 'l','9-5': 'l','9-6': 'l','9-7': 'l','9-8': 'l','9-9': 'l','9-10': 'l','9-11': 'l','9-12': 'l','9-13': 'l',
  '10-1': 'l','10-2': 'l','10-3': 'l','10-4': 'l','10-5': 'l','10-6': 'l','10-7': 'l','10-8': 'l','10-9': 'l','10-10': 'l','10-11': 'l','10-12': 'l','10-13': 'l',
  '11-1': 'l','11-2': 'l','11-3': 'l','11-4': 'l','11-5': 'l','11-6': 'l','11-7': 'l','11-8': 'l','11-9': 'l','11-10': 'l','11-11': 'l','11-12': 'l','11-13': 'l',
  '12-1': 'l','12-2': 'l','12-3': 'l','12-4': 'l','12-5': 'l','12-6': 'l','12-7': 'l','12-8': 'l','12-9': 'l','12-10': 'l','12-11': 'l','12-12': 'l','12-13': 'l',
  '13-1': 'l','13-2': 'l','13-3': 'l','13-4': 'l','13-5': 'l','13-6': 'l','13-7': 'l','13-8': 'l','13-9': 'l','13-10': 'l','13-11': 'l','13-12': 'l','13-13': 'l'
}

const emptyBoard = {
  '1-1': 'l','1-2': 'l','1-3': 'l','1-4': 'l','1-5': 'l','1-6': 'l','1-7': 'l','1-8': 'l','1-9': 'l','1-10': 'l','1-11': 'l','1-12': 'l','1-13': 'l','1-14': 'l','1-15': 'l','1-16': 'l','1-17': 'l','1-18': 'l','1-19': 'l',
  '2-1': 'l','2-2': 'l','2-3': 'l','2-4': 'l','2-5': 'l','2-6': 'l','2-7': 'l','2-8': 'l','2-9': 'l','2-10': 'l','2-11': 'l','2-12': 'l','2-13': 'l','2-14': 'l','2-15': 'l','2-16': 'l','2-17': 'l','2-18': 'l','2-19': 'l',
  '3-1': 'l','3-2': 'l','3-3': 'l','3-4': 'l','3-5': 'l','3-6': 'l','3-7': 'l','3-8': 'l','3-9': 'l','3-10': 'l','3-11': 'l','3-12': 'l','3-13': 'l','3-14': 'l','3-15': 'l','3-16': 'l','3-17': 'l','3-18': 'l','3-19': 'l',
  '4-1': 'l','4-2': 'l','4-3': 'l','4-4': 'l','4-5': 'l','4-6': 'l','4-7': 'l','4-8': 'l','4-9': 'l','4-10': 'l','4-11': 'l','4-12': 'l','4-13': 'l','4-14': 'l','4-15': 'l','4-16': 'l','4-17': 'l','4-18': 'l','4-19': 'l',
  '5-1': 'l','5-2': 'l','5-3': 'l','5-4': 'l','5-5': 'l','5-6': 'l','5-7': 'l','5-8': 'l','5-9': 'l','5-10': 'l','5-11': 'l','5-12': 'l','5-13': 'l','5-14': 'l','5-15': 'l','5-16': 'l','5-17': 'l','5-18': 'l','5-19': 'l',
  '6-1': 'l','6-2': 'l','6-3': 'l','6-4': 'l','6-5': 'l','6-6': 'l','6-7': 'l','6-8': 'l','6-9': 'l','6-10': 'l','6-11': 'l','6-12': 'l','6-13': 'l','6-14': 'l','6-15': 'l','6-16': 'l','6-17': 'l','6-18': 'l','6-19': 'l',
  '7-1': 'l','7-2': 'l','7-3': 'l','7-4': 'l','7-5': 'l','7-6': 'l','7-7': 'l','7-8': 'l','7-9': 'l','7-10': 'l','7-11': 'l','7-12': 'l','7-13': 'l','7-14': 'l','7-15': 'l','7-16': 'l','7-17': 'l','7-18': 'l','7-19': 'l',
  '8-1': 'l','8-2': 'l','8-3': 'l','8-4': 'l','8-5': 'l','8-6': 'l','8-7': 'l','8-8': 'l','8-9': 'l','8-10': 'l','8-11': 'l','8-12': 'l','8-13': 'l','8-14': 'l','8-15': 'l','8-16': 'l','8-17': 'l','8-18': 'l','8-19': 'l',
  '9-1': 'l','9-2': 'l','9-3': 'l','9-4': 'l','9-5': 'l','9-6': 'l','9-7': 'l','9-8': 'l','9-9': 'l','9-10': 'l','9-11': 'l','9-12': 'l','9-13': 'l','9-14': 'l','9-15': 'l','9-16': 'l','9-17': 'l','9-18': 'l','9-19': 'l',
  '10-1': 'l','10-2': 'l','10-3': 'l','10-4': 'l','10-5': 'l','10-6': 'l','10-7': 'l','10-8': 'l','10-9': 'l','10-10': 'l','10-11': 'l','10-12': 'l','10-13': 'l','10-14': 'l','10-15': 'l','10-16': 'l','10-17': 'l','10-18': 'l','10-19': 'l',
  '11-1': 'l','11-2': 'l','11-3': 'l','11-4': 'l','11-5': 'l','11-6': 'l','11-7': 'l','11-8': 'l','11-9': 'l','11-10': 'l','11-11': 'l','11-12': 'l','11-13': 'l','11-14': 'l','11-15': 'l','11-16': 'l','11-17': 'l','11-18': 'l','11-19': 'l',
  '12-1': 'l','12-2': 'l','12-3': 'l','12-4': 'l','12-5': 'l','12-6': 'l','12-7': 'l','12-8': 'l','12-9': 'l','12-10': 'l','12-11': 'l','12-12': 'l','12-13': 'l','12-14': 'l','12-15': 'l','12-16': 'l','12-17': 'l','12-18': 'l','12-19': 'l',
  '13-1': 'l','13-2': 'l','13-3': 'l','13-4': 'l','13-5': 'l','13-6': 'l','13-7': 'l','13-8': 'l','13-9': 'l','13-10': 'l','13-11': 'l','13-12': 'l','13-13': 'l','13-14': 'l','13-15': 'l','13-16': 'l','13-17': 'l','13-18': 'l','13-19': 'l',
  '14-1': 'l','14-2': 'l','14-3': 'l','14-4': 'l','14-5': 'l','14-6': 'l','14-7': 'l','14-8': 'l','14-9': 'l','14-10': 'l','14-11': 'l','14-12': 'l','14-13': 'l','14-14': 'l','14-15': 'l','14-16': 'l','14-17': 'l','14-18': 'l','14-19': 'l',
  '15-1': 'l','15-2': 'l','15-3': 'l','15-4': 'l','15-5': 'l','15-6': 'l','15-7': 'l','15-8': 'l','15-9': 'l','15-10': 'l','15-11': 'l','15-12': 'l','15-13': 'l','15-14': 'l','15-15': 'l','15-16': 'l','15-17': 'l','15-18': 'l','15-19': 'l',
  '16-1': 'l','16-2': 'l','16-3': 'l','16-4': 'l','16-5': 'l','16-6': 'l','16-7': 'l','16-8': 'l','16-9': 'l','16-10': 'l','16-11': 'l','16-12': 'l','16-13': 'l','16-14': 'l','16-15': 'l','16-16': 'l','16-17': 'l','16-18': 'l','16-19': 'l',
  '17-1': 'l','17-2': 'l','17-3': 'l','17-4': 'l','17-5': 'l','17-6': 'l','17-7': 'l','17-8': 'l','17-9': 'l','17-10': 'l','17-11': 'l','17-12': 'l','17-13': 'l','17-14': 'l','17-15': 'l','17-16': 'l','17-17': 'l','17-18': 'l','17-19': 'l',
  '18-1': 'l','18-2': 'l','18-3': 'l','18-4': 'l','18-5': 'l','18-6': 'l','18-7': 'l','18-8': 'l','18-9': 'l','18-10': 'l','18-11': 'l','18-12': 'l','18-13': 'l','18-14': 'l','18-15': 'l','18-16': 'l','18-17': 'l','18-18': 'l','18-19': 'l',
  '19-1': 'l','19-2': 'l','19-3': 'l','19-4': 'l','19-5': 'l','19-6': 'l','19-7': 'l','19-8': 'l','19-9': 'l','19-10': 'l','19-11': 'l','19-12': 'l','19-13': 'l','19-14': 'l','19-15': 'l','19-16': 'l','19-17': 'l','19-18': 'l','19-19': 'l'
};
