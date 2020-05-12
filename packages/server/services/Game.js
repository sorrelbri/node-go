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

const getSingleItemFromSet = set => {
  let entry;
  for (entry of set.entries()) {
  }
  return entry[0];
}

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
  if (point.stone) {
    point.legal = false;
    return point;
  }
  const neighbors = getNeighbors({Game, point});

  const isEmpty = point => point.stone === 0 && point.legal === true;
  const isEmptyAdjacent = neighbors.filter(isEmpty);

  // if empty point adjacent return true
  if (!isEmptyAdjacent.length) {
    
    // if group has liberties return true
    const isTurnStone = neighbor => neighbor.stone === Game.turn;
    const getGroupLiberties = point => Array.from(Game.groups[point.group].liberties);
    const isNotSamePoint = liberty => liberty.pos.x !== point.pos.x && liberty.pos.y !== point.pos.y;
    const isInGroupWithLiberties = neighbor => getGroupLiberties(neighbor).filter(isNotSamePoint).length;
    const isInLiveGroup = neighbors.filter(isTurnStone).filter(isInGroupWithLiberties).length;

    if (isInLiveGroup) {
      point.legal = true;
      return point;
    }

    // if move would capture opposing group return true
    if (point.capturing[Game.turn].size) {
      point.legal = true;
      return point;
    }

    point.legal = false;
    return point;
  }
  point.legal = true;
  return point;
}

const getBoardState = (Game) => {
  const getLegal = point => checkLegal({ point, Game })
  const boardState = pipeMap(getLegal)(Game.boardState);
  Game.kos.forEach(ko => {
    boardState[ko].legal = false;
  });
  return boardState;
}

const getLegalMoves = (Game) => {
  const mapLegal = point => point.legal ? 'l' : point.stone;
  const legalMoves = pipeMap(mapLegal)(Game.boardState);
  Game.kos.forEach(ko => {
    legalMoves[ko] = 'k';
  });
  return legalMoves;
}

const getNeighbors = ({ Game, point }) => {
  let { top = null, btm = null, lft = null, rgt = null} = point.neighbors;
  const { boardState, boardSize } = Game;
  // boardState[0] = [ '1-1', Point({x:1, y:1, boardSize}) ]
  if (top) top = boardState[top];
  if (btm) btm = boardState[btm];
  if (lft) lft = boardState[lft];
  if (rgt) rgt = boardState[rgt];
  return [ top, btm, lft, rgt ].filter(value => value);
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
      boardState[pt].makeMove({...game, boardState});
    });
    game.turn *= -1;
  }
  return boardState;
}

// returns Game object
const Game = ({gameData = {}, gameRecord = []} = {}) => {
  const helper = {
    clearKo: function() {
      this.kos.forEach(ko => {
        this.boardState[ko] = { ...this.boardState[ko], legal: true, ko: false };
      })
      this.kos = [];
    },
  }

  if (gameRecord.length) {
    // play through all the moves
    return gameRecord.reduce((game, move) => game.makeMove(move), Game({gameData}).initGame())
  }
  return {
    winner:       gameData.winner    ||null,
    turn:         gameData.turn      || 0,    // turn logic depends on handicap stones
    pass:         gameData.pass      || 0,    // -1 represents state in which resignation has been submitted, not confirmed
    komi:         gameData.komi      || 6.5,  // komi depends on handicap stones + player rank
    handicap:     gameData.handicap  || 0,
    boardSize:    gameData.boardSize || 19,
    groups:       {},
    boardState:   {},
    kos:          [],
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
      this.boardState = initBoard(this);
      this.boardState = getBoardState(this);
      this.legalMoves = getLegalMoves(this)
      return this;
    },

    addToRecord: function(moveObject) {
      this.gameRecord.push(moveObject);
    },

    getMeta: function() {
      // cannot be chained 
      // does not affect game object
      return {
        winner: this.winner, 
        turn: this.turn, 
        pass: this.pass, 
        playerState: this.playerState, 
        gameRecord: this.gameRecord, 
        boardSize: this.boardSize, 
        handicap: this.handicap, 
        komi: this.komi 
      }
    },

    makeMove: function({ player, pos: {x, y}}) {
      let game = this;
      let success = false;
      const point = game.boardState[`${x}-${y}`];
      const isTurn = ( game.turn === 1 && player === 'black' ) 
                  || ( game.turn === -1 && player === 'white' );
      if (isTurn) {
        if (point.legal) {
          game.addToRecord({ player, pos: { x, y } });
          if (this.kos.length) helper.clearKo.call(this);
          point.makeMove(game);
          game.turn *= -1;
          success = true;
        }
      }
      game.boardState = getBoardState(game);
      return {...game, legalMoves: getLegalMoves(game), success };
    },

    initGroup: function(point) {
      const group = Symbol(`${point.pos.x}-${point.pos.y}`);
      this.groups[group] = { stones: new Set(), liberties: new Set()};
      return { game: this, group };
    },

    returnToMove: function(lastMove) {
      const { komi, handicap, boardSize } = this;
      if (lastMove === 0) {
        return Game({
          gameData: { komi, handicap, boardSize }
        }).initGame();
      }
      const length = this.gameRecord.length;
      const index = lastMove < 0 ? length + lastMove : lastMove;
      if (lastMove >= length && lastMove > 0) return this;
      return Game({ 
        gameData: { komi, handicap, boardSize }, 
        gameRecord: [...this.gameRecord.slice(0, index)]
      });
    }
  }
};

const Point = ({x, y, boardSize = 19}) => {
  let point = {
    pos:          {x, y},
    key:          `${x}-${y}`,
    stone:        0, // can be 1, -1, 0,
    ko:           false,
    legal:        true,
    territory:    0,
    capturing:    {
      '1':  new Set(),
      '-1': new Set()
    },
    group:        null,
    neighbors: {
      top: x > 1          ? `${ x - 1 }-${ y }` : null,
      btm: x < boardSize  ? `${ x + 1 }-${ y }` : null,
      rgt: y < boardSize  ? `${ x }-${ y + 1 }` : null,
      lft: y > 1          ? `${ x }-${ y - 1 }` : null
    },

    makeMove: function(Game) {
      this.stone = Game.turn;
      this.legal = false;
      if (this.capturing[this.stone].size) {
        Game = this.makeCaptures(Game);
      }
      Game = this.joinGroup({ point: this, Game });
      return this.checkCaptures(Game);
    },
    
    joinGroup: function({ point, Game }) {
      if (point.group !== this.group || !point.group) {
        // if point has no group set current group to new Symbol in game object
        if (!point.group) {
          const { game, group } = Game.initGroup(point);
          this.group = group;
          Game = game;
        }
        
        // add current point to global group and override current group
        Game.groups[point.group].stones.add(this);
        if (this.group !== point.group) {
          this.group = point.group;
        }
        Game = this.setLiberties(Game);
        getNeighbors({ point:this, Game }).forEach(neighbor => {
          if ( neighbor.stone === this.stone
            // this check prevents infinite call chains
            && neighbor.group !== this.group 
          ) {
            Game = neighbor.joinGroup({ point: this, Game });
          }
        })
      }
      return Game;
    },

    setLiberties: function(Game) {
      const neighbors = getNeighbors({ point: this, Game });
      const liberties = Game.groups[this.group].liberties;
      // if point is occupied remove it from liberties set of point group, else add it
      neighbors.forEach(neighbor => {
        if (neighbor.stone !== 0) {
          liberties.delete(neighbor);
          Game.groups[neighbor.group].liberties.delete(this);
        } 
        if (neighbor.stone === 0) {
          liberties.add(neighbor) 
        }
      });
      return Game;
    },

    checkCaptures: function(game) {
      // if this stone has one liberty
      const liberties = game.groups[this.group].liberties;
      if (liberties.size === 1) {
        const lastLiberty = getSingleItemFromSet(liberties);
        lastLiberty.capturing[this.stone * -1].add(this.group);
      }
      if (liberties.size > 1) {
        liberties.forEach(liberty => liberty.capturing[this.stone * -1 ].delete(this.group))
      }

      // if neighbors have one liberty
      const neighbors = getNeighbors({point: this, Game: game}).filter(neighbor => neighbor.stone === -1 * this.stone)
      neighbors.forEach( neighbor => {
        const liberties = game.groups[neighbor.group] && game.groups[neighbor.group].liberties;
        if (liberties && liberties.size === 1) {
          const lastLiberty = getSingleItemFromSet(liberties);
          lastLiberty.capturing[neighbor.stone * -1].add(neighbor.group);
        }
      });
      return game;
    },

    makeCaptures: function(game) {
      // for each group
      for (let [captureGroup, _] of this.capturing[this.stone].entries()) {

        const capturesSet = game.groups[captureGroup].stones;
        for (let [capture, _] of capturesSet.entries()) {
          game = capture.removeStone(game);
          if (capturesSet.size === 1) {
            const neighbors = getNeighbors({ point: this, Game: game })
            const liberties = neighbors.filter(neighbor => neighbor.stone === 0);
            const groupStones = neighbors.filter(neighbor => neighbor.stone === this.stone);
            if (liberties.length === 1 && groupStones.length === 0) {
              capture.ko = true;
              game.kos.push(capture.key)
            }
          }
        }

      }
      // points with stones cannot be played to capture
      this.capturing = { '1': new Set(), '-1': new Set() }
      return {...game, boardState: { ...game.boardState, [this.key]: this } };
    },

    removeStone: function(game) {
      if (this.stone = 0) {
        return game;
      }
      // reset point
      this.stone = 0;
      this.group = null;
      this.capturing[game.turn] = new Set();
      // add captures
      const player = game.turn > 0 ? 'b' : 'w';
      game.playerState[`${player}Captures`] += 1;

      // add as liberty to neighbors
      const neighbors = getNeighbors({ point: this, Game: game }).filter(neighbor => neighbor.stone !== 0 && neighbor.group);
      neighbors.forEach(neighbor => {
        game.groups[neighbor.group].liberties.add(this);
        neighbor.checkCaptures(game)
      })

      return {...game, boardState: {...game.boardState, [this.key]: this}};
    }
  }
  for (let [key, value] of Object.entries(point.neighbors)) {
    if (value) continue;
    delete point.neighbors[key];
  }
  return point;
};

module.exports = {
  Game,
  Point
}

// Game().initGame()
//     .makeMove({ player: 'black', pos: { x: 1, y: 1 } })   //    1  2  3
//     .makeMove({ player: 'white', pos: { x: 1, y: 2 } })   // 1  1 -1  1
//     .makeMove({ player: 'black', pos: { x: 2, y: 2 } })   // 2 -1  1
//     .makeMove({ player: 'white', pos: { x: 2, y: 1 } })
//     .makeMove({ player: 'black', pos: { x: 1, y: 3 } })