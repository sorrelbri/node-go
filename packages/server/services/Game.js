/*----- constants -----*/
const STONES_DATA = {
  '-1': 'white',
  '0': 'none',
  '1': 'black',
  'k': 'ko'
}


// index corresponds to difference in player rank
const KOMI_REC = {
  '9': [
    5.5, 2.5, -0.5, -3.5, -6.5, -9.5, 12.5, 15.5, 18.5, 21.5
  ],
  '13': [
    5.5, 0.5, -5.5, 0.5, -5.5, 0.5, -5.5, 0.5, -5.5, 0.5
  ],
  '19': [
    7.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5
  ]
}

const HANDI_REC = {
  '9': [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ],
  '13': [
    0, 0, 0, 2, 2, 3, 3, 4, 4, 5
  ],
  '19': [
    0, 0, 2, 3, 4, 5, 6, 7, 8, 9
  ]
}

// index represents handicap placement for different board-sizes, eg handiPlace['9][1] = { (3, 3), (7, 7) }
// last array in each property also used for hoshi rendering 
const HANDI_PLACE = {
  '9' : [
    0, 0,
    [[ 7, 3 ], [ 3, 7 ] ], 
    [ [ 7, 7 ], [ 7, 3 ], [ 3, 7 ] ], 
    [ [ 3, 3 ], [ 7, 7 ], [ 3, 7 ], [ 7, 3 ] ] 
  ],
  '13' : [
    0, 0,
    [ [ 4, 10 ], [ 10, 4 ] ],
    [ [ 10, 10 ], [ 4, 10 ], [ 10, 4] ],
    [ [ 4, 4 ], [ 10, 10 ], [ 4, 10 ], [ 10, 4] ],
    [ [ 7, 7 ], [ 4, 4 ], [ 10, 10 ], [ 4, 10 ], [ 10, 4] ],
    [ [ 7, 4 ], [ 4, 7 ], [ 4, 4 ], [ 10, 10 ], [ 4, 10 ], [ 10, 4] ],
    [ [ 7, 7 ], [ 7, 4 ], [ 4, 7 ], [ 4, 4 ], [ 10, 10 ], [ 4, 10 ], [ 10, 4] ],
    [ [ 10, 7 ], [ 7, 4 ], [ 7, 10 ], [ 4, 7 ], [ 4, 4 ], [ 10, 10 ], [ 4, 10 ], [ 10, 4] ],
    [ [ 7, 7 ], [ 10, 7 ], [ 7, 4 ], [ 7, 10 ], [ 4, 7 ], [ 4, 4 ], [ 10, 10 ], [ 4, 10 ], [ 10, 4] ],
  ],
  '19' : [
    0, 0,
    [ [ 4, 16 ], [ 16, 4 ] ],
    [ [ 16, 16 ], [ 4, 16 ], [ 16, 4] ],
    [ [ 4, 4 ], [ 16, 16 ], [ 4, 16 ], [ 16, 4] ],
    [ [ 10, 10 ], [ 4, 4 ], [ 16, 16 ], [ 4, 16 ], [ 16, 4] ],
    [ [ 10, 4 ], [ 4, 10 ], [ 4, 4 ], [ 16, 16 ], [ 4, 16 ], [ 16, 4] ],
    [ [ 10, 10 ], [ 10, 4 ], [ 4, 10 ], [ 4, 4 ], [ 16, 16 ], [ 4, 16 ], [ 16, 4] ],
    [ [ 16, 10 ], [ 10, 4 ], [ 10, 16 ], [ 4, 10 ], [ 4, 4 ], [ 16, 16 ], [ 4, 16 ], [ 16, 4] ],
    [ [ 10, 10 ], [ 16, 10 ], [ 10, 4 ], [ 10, 16 ], [ 4, 10 ], [ 4, 4 ], [ 16, 16 ], [ 4, 16 ], [ 16, 4] ],
  ]
};

class Game {
  constructor(gameData, gameRecord) {
    this.winner =       gameData.winner || null,
    this.turn =         gameData.turn || 1, // turn logic depends on handicap stones
    this.pass =         gameData.pass || 0, // -1 represents state in which resignation has been submitted, not confirmed
    this.komi =         gameData.komi || 6.5, // komi depends on handicap stones + player rank
    this.handicap =     gameData.handicap || 0,
    this.boardSize =    gameData.boardSize || 19,
    this.groups =       {},
    this.boardState =   [],
    this.gameRecord =   gameRecord || [],
    this.playerState =  gameData.playerState || {
      bCaptures: 0,
      wCaptures: 0,
      bScore: 0,
      wScore: 0
    }
  }

  initGame = () => {
    this.winner = null;
    this.pass =   null;
    this.turn =   this.handicap ? -1 : 1;

    this.initBoard();
    return this.getBoardState();
  }

  initBoard = () => {
    let i = 0;
    while (i < this.boardSize * this.boardSize) {
      let point = new Point( Math.floor(i / this.boardSize) + 1, i % this.boardSize + 1, this)
      this.boardState.push(point);
      i++;
    }
    this.initHandi();
  }
  
  initHandi = () => {
    if (this.handicap < 2) return;
    HANDI_PLACE[this.boardSize][this.handicap].forEach(pt => {
      if (!pt) return;
      let handi = this.findPointFromIdx(pt);
      handi.stone = 1;
      handi.joinGroup(this);
    })
  }

  getBoardState = () => {
    this.boardState.forEach(point => point.legal = checkLegal(point, this))
    return this.boardState.reduce((boardState, point) => {
      boardState[`${point.pos[0]}-${point.pos[1]}`] = point.legal || point.stone;
      return boardState;
    }, {})
  }

  getMeta = () => {
    return { winner: this.winner, turn: this.turn, pass: this.pass, playerState: this.playerState, gameRecord: this.gameRecord }
  }

  findPointFromIdx = (arr) => {
    return this.boardState.find( point => point.pos[0] === arr[0] && point.pos[1] === arr[1] );
  }

  makeMove = (move) => {
    const player = move.player === 'white' ? -1 : 1;
    const point = this.findPointFromIdx([move.pos.x, move.pos.y])
    if ( !checkLegal(point, this) ) throw Error('illegal move');
    clearKo(this);
    clearPass(this);
    resolveCaptures(point, this);
    point.stone = this.turn;
    point.joinGroup(this);
    clearCaptures(this);
    this.gameRecord.push(move)
    this.turn*= -1;
    return { board: this.getBoardState(), meta: this.getMeta()};
  }

  clickBoard = (evt) => {
    evt.stopPropagation();
    if (gameState.pass > 1 || gameState.winner) return editTerritory(evt);
    // checks for placement and pushes to cell
    let placement = [ parseInt(evt.target.closest('td').id.split('-')[0]), parseInt(evt.target.closest('td').id.split('-')[1]) ];
    let point = findPointFromIdx(placement);
    //checks that this placement was marked as legal
    if ( !checkLegal(point) ) return;
    clearKo();
    clearPass();
    resolveCaptures(point);
    point.stone = gameState.turn;
    point.joinGroup();
    playSound(point);
    clearCaptures();
    gameState.gameRecord.push(`${STONES_DATA[gameState.turn]}: ${point.pos}`)
    gameState.turn*= -1;
  }

}


class Point {
  constructor(x, y, Game) {
    this.pos = [ x, y ]
    this.stone = 0; // this is where move placement will go 0, 1, -1, also contains ko: 'k'
    this.legal;
    this.territory;
    this.capturing = [];
    this.groupMembers = [ this ];
    this.neighbors = {
      top: {},
      btm: {},
      lft: {},
      rgt: {}
    }
    this.neighbors.top = x > 1 ? [ x - 1, y ] : null;
    this.neighbors.btm = x < Game.boardSize ? [ x + 1, y ] : null;
    this.neighbors.rgt = y < Game.boardSize ? [ x, y + 1 ] : null;
    this.neighbors.lft = y > 1 ? [ x, y - 1 ] : null;
  } 

  checkNeighbors = (Game) => {
    let neighborsArr = [];
    for (let neighbor in this.neighbors) {
      let nbr = this.neighbors[neighbor];
      // neighbor exists it's point is stored as { rPos, cPos}
      if ( nbr !== null ) {
      neighborsArr.push(Game.boardState.find(pt =>  pt.pos[0] === nbr[0] && pt.pos[1] === nbr[1]))
      }
    };
    // returns array of existing neighbors to calling function
    return neighborsArr;
  }

  getLiberties = (Game) => { 
    let neighborsArr = this.checkNeighbors(Game).filter(pt => pt.stone === 0);
    return neighborsArr;
  }

  joinGroup = (Game) => {
    this.groupMembers = this.groupMembers.filter(grp => grp.stone === this.stone);
    this.groupMembers.push(this);
    let frns = this.checkNeighbors(Game).filter(nbr => nbr.stone === this.stone);
    for (let frn of frns) {
      this.groupMembers.push(frn);
    }
    this.groupMembers = Array.from(new Set(this.groupMembers));
    for (let grpMem in this.groupMembers) {
      this.groupMembers = Array.from(new Set(this.groupMembers.concat(this.groupMembers[grpMem].groupMembers)));
    }
    for (let grpMem in this.groupMembers) {
      this.groupMembers[grpMem].groupMembers = Array.from(new Set(this.groupMembers[grpMem].groupMembers.concat(this.groupMembers)));
    }
  }

  checkCapture = (Game) => {
    let opps = this.checkNeighbors(Game).filter(nbr => nbr.stone === Game.turn * -1 
      && nbr.getLiberties(Game).every(liberty => liberty === this));
    for (let opp of opps) {
      if (opp.groupMembers.every(stone => stone.getLiberties().filter(liberty => liberty !== this).length === 0)) {
        this.capturing = this.capturing.concat(opp.groupMembers);
      };
    }
    this.capturing = Array.from(new Set(this.capturing));
    return this.capturing;
  }

  checkGroup = () => { // liberty is true when called by move false when called by check Capture
    let frns = this.checkNeighbors().filter(nbr => nbr.stone === gameState.turn);
    for (let frn in frns) {
      if (frns[frn].groupMembers.find(stone => stone.getLiberties().find(liberty => liberty !== this))) return true;
      continue;
      }
    }

  cycleTerritory = () => {
    if (this.stone) {
      this.groupMembers.forEach(pt => pt.territory = pt.territory * -1);
    } else {
      this.groupMembers.forEach(pt => {
        switch (pt.territory) {
        case 1:
          pt.territory = -1;
          break;
        case -1:
          pt.territory = 'd';
          break;
        case 'd':
          pt.territory = 1;
          break;
        }
      });
    }
  }
}


function clearKo(Game) {
  for (let point in Game.boardState) {
    point = Game.boardState[point];
    point.stone = point.stone === 'k' ? 0 : point.stone;
  }
}

function clearPass(Game) {
  Game.pass = 0;
}

function resolveCaptures(point, Game) {
  if(!point.capturing.length) {
    point.checkCapture(Game);
  }
  if(point.capturing.length) {
    point.capturing.forEach(cap => {
      Game.playerState[gameState.turn > 0 ? 'bCaptures' : 'wCaptures']++;
      cap.stone = checkKo(point) ? 'k' : 0;
      cap.groupMembers = [];
    })
  }
}

function checkLegal(point, Game) {
  // clearOverlay();
  // first step in logic: is point occupied, or in ko
  if (point.stone) return 0;
  // if point is not empty check if liberties
  if (point.getLiberties(Game).length < 1) {
    //if no liberties check if enemy group has liberties
    if ( point.checkCapture(Game).length ) return 'l';
    //if neighboring point is not empty check if friendly group is alive
    if (point.checkGroup(Game)) return 'l';
    return 0;
  }
  return 'l';
}

function clearOverlay() {
  for (let point in boardState) {
    point = boardState[point];
    point.legal = false;
  }
}

function checkKo(point) { // currently prevents snapback // capturing point has no liberties and is only capturing one stone and 
  if (!point.getLiberties().length && point.capturing.length === 1 && !point.checkNeighbors().some(stone => stone.stone === gameState.turn)) return true;
}


function clearCaptures(Game) {
  for (let point in Game.boardState) {
    point = Game.boardState[point];
    point.capturing = [];
  }
}

function playerPass() {
  // display confirmation message
  clearKo();
  clearCaptures();
  gameState.gameRecord.push(`${STONES_DATA[gameState.turn]}: pass`)
  gameState.pass++;
  if (gameState.pass === 2) return endGame();
  gameState.turn*= -1;
}


/*----- endgame functions -----*/

function playerResign() {
  // display confirmation message
  gameState.pass = -1;
}

function clickGameHud() {
  if (gameState.pass > 1 && !gameState.winner) calculateWinner();
  if (gameState.pass < 0) confirmResign();
}

function confirmResign() {
  gameState.gameRecord.push(`${STONES_DATA[gameState.turn]}: resign`);
  gameState.winner = STONES_DATA[gameState.turn * -1];
  endGame();
}

function endGame() {
  if (!gameState.winner) endGameSetTerritory()
}

function calculateWinner() {
  let whiteTerritory = boardState.reduce((acc, pt) => {
    if (pt.territory === -1 && pt.stone !== -1) {
      return acc = acc + (pt.stone === 0 ? 1 : 2);
    }
    return acc;
  }, 0);
  let blackTerritory = boardState.reduce((acc, pt) => {
    if (pt.territory === 1 && pt.stone !== 1) {
      return acc + (pt.stone === 0 ? 1 : 2);
    }
    return acc;
  }, 0);
  gameState.playerState.wScore =
    gameState.playerState.wCaptures
    + (gameState.komi < 0 ? gameState.komi * -1 : 0)
    + whiteTerritory;
  gameState.playerState.bScore =
    gameState.playerState.bCaptures
    + (gameState.komi > 0 ? gameState.komi : 0)
    + blackTerritory;
  gameState.winner = gameState.playerState.wScore > gameState.playerState.bScore ? -1 : 1;
  gameState.gameRecord.push(`${STONES_DATA[gameState.winner]}: +${Math.abs(gameState.playerState.wScore - gameState.playerState.bScore)}`)
}

function endGameSetTerritory() {
  let emptyPoints = boardState.filter(pt => !pt.stone);
  emptyPoints.forEach(pt => pt.joinGroup());
  emptyPointSetTerritory(emptyPoints);
  groupsMarkDeadLive();
}

function groupsMarkDeadLive() {
  boardState.filter(pt => (!pt.territory ))
    .forEach(pt => {
      if (pt.groupMembers.some(grpMem => {
        return grpMem.checkNeighbors().some(nbr => nbr.territory === pt.stone && nbr.stone === 0)
      })) {
        pt.groupMembers.forEach(grpMem => grpMem.territory = pt.stone);
      }
    });
  boardState.filter(pt => (!pt.territory)).forEach(pt => {
    pt.territory = pt.stone * -1;
  });  
}

function emptyPointSetTerritory(emptyPoints) {
  emptyPoints.filter(pt => !pt.territory && pt.checkNeighbors().filter(nbr => nbr.stone !== 0))
    .forEach(pt => {
      let b = pt.groupMembers.reduce((acc, grpMem) => {
        let bNbr = grpMem.checkNeighbors().filter(nbr => nbr.stone === 1).length;
        return acc + bNbr;
      }, 0);
      let w = pt.groupMembers.reduce((acc, grpMem) => {
        let wNbr = grpMem.checkNeighbors().filter(nbr => nbr.stone === -1).length;
        return acc + wNbr;
      }, 0);
      pt.groupMembers.forEach(grp => {
        if (Math.abs(b - w) < 4 && b && w) grp.territory = 'd'
        else grp.territory = b > w ? 1 : -1;
      })
    });
}

module.exports = {
  Game
}
