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
  9 : [
    0, 0,
    [ '7-3', '3-7' ], // 2 
    [ '7-7', '7-3', '3-7' ], 
    [ '3-3', '7-7', '3-7', '7-3' ] 
  ],
  13 : [
    0, 0,
    [ '4-10', '10-4' ], // 2
    [ '10-10', '4-10', '10-4' ],
    [ '4-4', '10-10', '4-10', '10-4' ],
    [ '7-7', '4-4', '10-10', '4-10', '10-4' ],
    [ '7-4', '4-7', '4-4', '10-10', '4-10', '10-4' ],
    [ '7-7', '7-4', '4-7', '4-4', '10-10', '4-10', '10-4' ],
    [ '10-7', '7-4', '7-10', '4-7', '4-4', '10-10', '4-10', '10-4' ],
    [ '7-7', '10-7', '7-4', '7-10', '4-7', '4-4', '10-10', '4-10', '10-4' ],
  ],
  19 : [
    0, 0,
    [ '4-16', '16-4' ], // 2
    [ '16-16', '4-16', '16-4' ],
    [ '4-4', '16-16', '4-16', '16-4' ],
    [ '10-10', '4-4', '16-16', '4-16', '16-4' ],
    [ '10-4', '4-10', '4-4', '16-16', '4-16', '16-4' ],
    [ '10-10', '10-4', '4-10', '4-4', '16-16', '4-16', '16-4' ],
    [ '16-10', '10-4', '10-16', '4-10', '4-4', '16-16', '4-16', '16-4' ],
    [ '10-10', '16-10', '10-4', '10-16', '4-10', '4-4', '16-16', '4-16', '16-4' ],
  ]
};


const pipeMap = (...funcs) => obj => {
  const arr = Object.entries(obj).reduce((acc, [key, value], i, arr) => {
    funcs.forEach(func => value = func(value, i, arr));
    return [...acc, [key, value]];
  },[]);
  return arr.reduce((acc, [key, value]) => {
    return { ...acc, [key]: value }
  }, {});
}

const checkLegal = ({ point, Game }) => {
  // if stone (includes ko) return false
  let legal = false;
  if (point.stone) {
    return { ...point, legal };
  }
  // if liberties return true
  // if group has liberties return true
  // if move would capture opposing group 
    // set capturing object and return true
  point.legal = !point.stone ? true : false;
  return point;
}

const getBoardState = (Game) => {
  const getLegal = point => checkLegal({ point, Game }).legal ? 'l' : point.stone;
  return pipeMap(getLegal)(Game.boardState);
}

const getNeighbors = boardSize => (point, i, boardState) => {
  const { top, btm, lft, rgt} = point.neighbors;
  // boardState[0] = [ '1-1', Point({x:1, y:1, boardSize}) ]
  point.neighbors.top = top ? boardState[i - boardSize][1] : top;
  point.neighbors.btm = btm ? boardState[i + boardSize][1] : btm;
  point.neighbors.lft = lft ? boardState[i - 1][1] : lft;
  point.neighbors.rgt = rgt ? boardState[i + 1][1] : rgt;
  return point;
}

const initBoard = (game) => {
  const boardState = {};
  const { boardSize, handicap } = game;
  for (let i = 0; i < Math.pow(boardSize, 2); i++) {
    const point = Point({
      x: Math.floor(i / boardSize) + 1, 
      y: i % boardSize + 1, 
      boardSize 
    });
    boardState[`${point.pos.x}-${point.pos.y}`] = point;
  }
  if (handicap) {
    HANDI_PLACE[boardSize][handicap].forEach(pt => {
      boardState[pt].makeMove(game);
    });
    game.turn *= -1;
  }
  const boardStateWithNeighbors = pipeMap(getNeighbors(boardSize))(boardState)
  return boardStateWithNeighbors;
}

// returns Game object
const Game = ({gameData = {}, gameRecord = []} = {}) => ({
  winner:       gameData.winner    ||null,
  turn:         gameData.turn      || 0, // turn logic depends on handicap stones
  pass:         gameData.pass      || 0, // -1 represents state in which resignation has been submitted, not confirmed
  komi:         gameData.komi      || 6.5, // komi depends on handicap stones + player rank
  handicap:     gameData.handicap  || 0,
  boardSize:    gameData.boardSize || 19,
  groups:       {},
  boardState:   {},
  gameRecord:   gameRecord,
  playerState:  gameData.playerState || {
    bCaptures: 0,
    wCaptures: 0,
    bScore: 0,
    wScore: 0
  },

  initGame: function() {
    this.winner =     null;
    this.pass =       0;
    this.turn =       1;
    this.boardState = initBoard(this)
    return { ...this, legalMoves: getBoardState(this)};
  },

  getMeta: function() {
    return { winner: this.winner, turn: this.turn, pass: this.pass, playerState: this.playerState, gameRecord: this.gameRecord }
  },

  makeMove: function({ player, pos: {x, y}}) {
    let success = false;
    const point = this.boardState[`${x}-${y}`];
    const isTurn = ( this.turn === 1 && player === 'black' ) 
                || ( this.turn === -1 && player === 'white' );
    if (isTurn) {
      if (point.legal) {
        point.makeMove(this);
        this.turn *= -1;
        success = true;
      }
    }
    return {...this, legalMoves: getBoardState(this), success };
  },

  initGroup: function(point) {
    const newSymbol = Symbol(`${point.pos.x}-${point.pos.y}`);
    this.groups[newSymbol] = { stones: new Set(), liberties: new Set()};
    return newSymbol;
  }
});

const Point = ({x, y, boardSize = 19}) => ({
  pos:          {x, y},
  stone:        0, // can be 1, -1, 0, or 'k' for ko
  legal:        true,
  territory:    0,
  capturing:    [],
  group:        null,
  neighbors: {
    top: x > 1          ? `${ x - 1 }-${ y }` : null,
    btm: x < boardSize  ? `${ x + 1 }-${ y }` : null,
    rgt: y < boardSize  ? `${ x }-${ y + 1 }` : null,
    lft: y > 1          ? `${ x }-${ y - 1 }` : null
  },

  makeMove: function(game) {
    this.stone = game.turn;
    this.legal = false;
    return this.joinGroup({ point: this, game });
  },
  
  joinGroup: function({ point, game }) {
    if (point.group !== this.group || !point.group) {
      // if point has no group set current group to new Symbol in game object
      if (!point.group) {
        point.group = game.initGroup(point);
      }
      
      // add current point to global group and override current group
      game.groups[point.group].stones.add(this);
      this.group = point.group;
      this.setLiberties(game);
      for (let neighbor of Object.values(this.neighbors)) {
        if ( neighbor.stone === this.stone
          // this check prevents infinite call chains
          && neighbor.group !== this.group 
        ) {
          neighbor.joinGroup({ point: this, game });
        }
      }
    }
  },

  setLiberties: function(game) {
    const neighbors = Object.values(this.neighbors);
    const liberties = game.groups[this.group].liberties;
    // if point is occupied remove it from liberties set of point group, else add it
    neighbors.forEach( pt => pt ? liberties.delete(pt) : liberties.add(pt) );
  }
});

module.exports = {
  Game,
  Point
}