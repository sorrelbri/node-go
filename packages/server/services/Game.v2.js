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
  const arr = Object.entries(obj).reduce((acc, [key, value]) => {
    funcs.forEach(func => value = func(value));
    return [...acc, [key, value]];
  },[]);
  return arr.reduce((acc, [key, value]) => {
    return { ...acc, [key]: value }
  }, {});
}

const checkLegal = ({ point, Game }) => {
  return point.stone || 'l';
}

const getBoardState = (Game) => {
  const getLegal = point => checkLegal({ point, Game });
  return pipeMap(getLegal)(Game.boardState);
}

const initBoard = ({ boardSize, handicap }) => {
  const boardState = {};
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
      boardState[pt].stone = 1;
    });
  }
  return boardState;
}

// returns Game object
const Game = ({gameData = {}, gameRecord = []} = {}) => ({
  winner:       gameData.winner    ||null,
  turn:         gameData.turn      || 1, // turn logic depends on handicap stones
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
    this.turn =       this.handicap ? -1 : 1;
    this.boardState = initBoard({ boardSize: this.boardSize, handicap: this.handicap})
    // return this.boardState
    return getBoardState(this);
  }
});

const Point = ({x, y, boardSize = 19}) => ({
  pos:          {x, y},
  stone:        0, // can be 1, -1, 0, or 'k' for ko
  legal:        0,
  territory:    0,
  capturing:    [],
  groupMembers: [ this ],
  neighbors: {
    top: x > 1          ? `${ x - 1 }-${ y }` : null,
    btm: x < boardSize  ? `${ x + 1 }-${ y }` : null,
    rgt: y < boardSize  ? `${ x }-${ y + 1 }` : null,
    lft: y > 1          ? `${ x }-${ y - 1 }` : null
  }
});

module.exports = {
  Game,
  Point
}