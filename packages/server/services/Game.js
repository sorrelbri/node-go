// index corresponds to difference in player rank
const KOMI_REC = {
  "9": [5.5, 2.5, -0.5, -3.5, -6.5, -9.5, 12.5, 15.5, 18.5, 21.5],
  "13": [5.5, 0.5, -5.5, 0.5, -5.5, 0.5, -5.5, 0.5, -5.5, 0.5],
  "19": [7.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
};

const HANDI_REC = {
  "9": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "13": [0, 0, 0, 2, 2, 3, 3, 4, 4, 5],
  "19": [0, 0, 2, 3, 4, 5, 6, 7, 8, 9],
};

// index represents handicap placement for different board-sizes, eg handiPlace['9][1] = { (3, 3), (7, 7) }
// last array in each property also used for hoshi rendering
const HANDI_PLACE = {
  9: [
    0,
    0,
    ["7-3", "3-7"], // 2
    ["7-7", "7-3", "3-7"],
    ["3-3", "7-7", "3-7", "7-3"],
  ],
  13: [
    0,
    0,
    ["4-10", "10-4"], // 2
    ["10-10", "4-10", "10-4"],
    ["4-4", "10-10", "4-10", "10-4"],
    ["7-7", "4-4", "10-10", "4-10", "10-4"],
    ["7-4", "4-7", "4-4", "10-10", "4-10", "10-4"],
    ["7-7", "7-4", "4-7", "4-4", "10-10", "4-10", "10-4"],
    ["10-7", "7-4", "7-10", "4-7", "4-4", "10-10", "4-10", "10-4"],
    ["7-7", "10-7", "7-4", "7-10", "4-7", "4-4", "10-10", "4-10", "10-4"],
  ],
  19: [
    0,
    0,
    ["4-16", "16-4"], // 2
    ["16-16", "4-16", "16-4"],
    ["4-4", "16-16", "4-16", "16-4"],
    ["10-10", "4-4", "16-16", "4-16", "16-4"],
    ["10-4", "4-10", "4-4", "16-16", "4-16", "16-4"],
    ["10-10", "10-4", "4-10", "4-4", "16-16", "4-16", "16-4"],
    ["16-10", "10-4", "10-16", "4-10", "4-4", "16-16", "4-16", "16-4"],
    ["10-10", "16-10", "10-4", "10-16", "4-10", "4-4", "16-16", "4-16", "16-4"],
  ],
};

const getSingleItemFromSet = (set) => {
  let entry;
  for (entry of set.entries()) {
  }
  return entry[0];
};

const pipeMap = (...funcs) => (obj) => {
  const arr = Object.entries(obj).reduce((acc, [key, value], i, arr) => {
    funcs.forEach((func) => (value = func(value, i, arr)));
    return [...acc, [key, value]];
  }, []);
  return arr.reduce((acc, [key, value]) => {
    return { ...acc, [key]: value };
  }, {});
};

const checkLegal = ({ point, Game }) => {
  // if stone (includes ko) return false
  if (point.stone) {
    point.legal = false;
    return point;
  }
  const neighbors = getNeighbors({ Game, point });

  const isEmpty = (point) => point.stone === 0 && point.legal === true;
  const isEmptyAdjacent = neighbors.filter(isEmpty);

  // if empty point adjacent return true
  if (!isEmptyAdjacent.length) {
    // if group has liberties return true
    const isTurnStone = (neighbor) => neighbor.stone === Game.turn;
    const getGroupLiberties = (point) =>
      Array.from(Game.groups[point.group].liberties);
    const isNotSamePoint = (liberty) =>
      !(liberty.pos.x === point.pos.x && liberty.pos.y === point.pos.y);
    const isInGroupWithLiberties = (neighbor) =>
      getGroupLiberties(neighbor).filter(isNotSamePoint).length;
    const isInLiveGroup = neighbors
      .filter(isTurnStone)
      .filter(isInGroupWithLiberties).length;

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
};

const getBoardState = (Game) => {
  const getLegal = (point) => checkLegal({ point, Game });
  const boardState = pipeMap(getLegal)(Game.boardState);
  Game.kos.forEach((ko) => {
    boardState[ko].legal = false;
  });
  return boardState;
};

const getLegalMoves = (Game) => {
  const mapLegal = (point) => (point.legal ? "l" : point.stone);
  const legalMoves = pipeMap(mapLegal)(Game.boardState);
  Game.kos.forEach((ko) => {
    legalMoves[ko] = "k";
  });
  return legalMoves;
};

const getTerritory = (Game) => {
  const mapTerritory = (point) => {
    if (point.territory === "d") return "d";
    if (point.territory > 0) return 1;
    if (point.territory < 0) return -1;
  };
  const territory = pipeMap(mapTerritory)(Game.boardState);
  return territory;
};

const getNeighbors = ({ Game, point }) => {
  let { top = null, btm = null, lft = null, rgt = null } = point.neighbors;
  const { boardState, boardSize } = Game;
  // boardState[0] = [ '1-1', Point({x:1, y:1, boardSize}) ]
  if (top) top = boardState[top];
  if (btm) btm = boardState[btm];
  if (lft) lft = boardState[lft];
  if (rgt) rgt = boardState[rgt];
  return [top, btm, lft, rgt].filter((value) => value);
};

const initBoard = (game) => {
  const boardState = {};
  const { boardSize, handicap } = game;
  for (let i = 0; i < Math.pow(boardSize, 2); i++) {
    const point = Point({
      x: Math.floor(i / boardSize) + 1,
      y: (i % boardSize) + 1,
      boardSize,
    });
    boardState[`${point.pos.x}-${point.pos.y}`] = point;
  }

  if (handicap) {
    HANDI_PLACE[boardSize][handicap].forEach((pt) => {
      boardState[pt].makeMove({ ...game, boardState });
    });
    game.turn *= -1;
  }
  return boardState;
};

// returns Game object
const Game = ({ gameData = {}, gameRecord = [] } = {}) => {
  const helper = {
    clearKo: function () {
      this.kos.forEach((ko) => {
        this.boardState[ko] = {
          ...this.boardState[ko],
          legal: true,
          ko: false,
        };
      });
      this.kos = [];
    },
  };
  if (gameRecord.length) {
    // play through all the moves
    const game = gameRecord.reduce(
      (game, move) =>
        move.length ? game.makeMove(move[0]) : game.makeMove(move),
      Game({ gameData }).initGame()
    );
    // ? why is this being wrapped?
    if (gameData && gameData.gameData && gameData.gameData.winner) {
      const { winner, score } = gameData.gameData;
      return game.manualEnd({ winner, score });
    }
    return game;
  }
  return {
    winner: gameData.winner || null,
    turn: gameData.turn || 0, // turn logic depends on handicap stones
    pass: gameData.pass || 0, // -1 represents state in which resignation has been submitted, not confirmed
    komi: gameData.komi || 6.5, // komi depends on handicap stones + player rank
    handicap: gameData.handicap || 0,
    boardSize: gameData.boardSize || 19,
    score: 0,
    groups: {}, // key is Symbol(position): {points: Set(), liberties: Set()}
    boardState: {},
    territory: {},
    kos: [],
    gameRecord: gameRecord,
    playerState: gameData.playerState || {
      bCaptures: 0,
      wCaptures: 0,
      bScore: 0,
      wScore: 0,
    },

    initGame: function () {
      this.winner = null;
      this.pass = 0;
      this.turn = 1;
      this.boardState = initBoard(this);
      this.boardState = getBoardState(this);
      this.legalMoves = getLegalMoves(this);
      return this;
    },

    addToRecord: function (moveObject) {
      this.gameRecord.push(moveObject);
    },

    getMeta: function () {
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
        komi: this.komi,
        score: this.score,
      };
    },

    checkMove: function ({ player, pos: { x, y } }) {
      // if game is over
      // TODO either change logic here or add additional method for handling moves off of record
      if (this.pass > 1) {
        return { ...this, success: false };
      }
      const point = this.boardState[`${x}-${y}`];
      const isTurn =
        (this.turn === 1 && player === "black") ||
        (this.turn === -1 && player === "white");
      if (isTurn) {
        if (point.legal) {
          return { ...this, success: true, move: { player, pos: { x, y } } };
        }
      }
      return { ...this, success: false };
    },

    makeMove: function ({ player, pos: { x, y }, id, prior }) {
      if (this.pass > 1) {
        return { ...this, success: false };
      }
      if (x === 0) return game.submitPass(player);

      let success = false;
      let game = this;

      // if checkMove has not been run, determine legality
      if (!game.move) {
        game = game.checkMove({ player, pos: { x, y } });
      }
      if (
        // if move is legal
        // ? unclear if checking move values is beneficial to prevent race conditions
        game.move &&
        game.move.player === player &&
        game.move.pos.x === x &&
        game.move.pos.y
      ) {
        const point = game.boardState[`${x}-${y}`];
        game.pass = 0;
        // allows for recording of prior move on game record
        game.addToRecord({ player, pos: { x, y }, id, prior });
        if (game.kos.length) helper.clearKo.call(game);
        point.makeMove(game);
        game.turn *= -1;
        success = true;
      }
      game.boardState = getBoardState(game);
      // remove move attribute to prevent duplicate moves
      delete game.move;
      return { ...game, legalMoves: getLegalMoves(game), success };
    },

    initGroup: function (point) {
      const group = Symbol(`${point.pos.x}-${point.pos.y}`);
      this.groups[group] = { stones: new Set(), liberties: new Set() };
      return { game: this, group };
    },

    returnToMove: function (lastMove) {
      const { komi, handicap, boardSize } = this;
      if (lastMove === 0) {
        return Game({
          gameData: { komi, handicap, boardSize },
        }).initGame();
      }
      const length = this.gameRecord.length;
      const index = lastMove < 0 ? length + lastMove : lastMove;
      if (lastMove >= length && lastMove > 0) return this;
      return Game({
        gameData: { komi, handicap, boardSize },
        gameRecord: [...this.gameRecord.slice(0, index)],
      });
    },

    submitPass: function (player) {
      if (player !== "black" && player !== "white") {
        return { ...this, success: false };
      }
      if (this.pass > 0) {
        return this.calculateTerritory();
      }
      this.pass = 1;
      this.addToRecord({ player, pos: { x: null, y: null } });
      if (this.kos.length) helper.clearKo.call(this);
      this.turn = player === "black" ? -1 : 1;
      this.boardState = getBoardState(this);
      return { ...this, legalMoves: getLegalMoves(this), success: true };
    },

    submitResign: function (player) {
      if (player === "black") this.winner = -1;
      if (player === "white") this.winner = 1;
      this.turn = 0;
      return this;
    },

    calculateTerritory: function () {
      // TODO manage territory counting
      // form groups for empty points
      const joinEmptyPoints = (point) => {
        if (point.stone) return point;
        point.joinEmptyPoints({ point, Game: this });
        return point;
      };
      // for each point determine territory
      const determineTerritory = (point) => {
        if (point.stone || point.territory) return point;
        const points = Array.from(this.groups[point.group].stones);
        const neighbors = points.flatMap((pt) =>
          getNeighbors({ Game: this, point: pt })
        );
        const stones = neighbors.filter((point) => point.stone !== 0);
        point.territory =
          stones.reduce((acc, { stone }) => acc + stone, 0) || "d";
        return point;
      };
      // for each non-empty point group determine life
      const determineLife = (point) => {
        if (!point.stone || point.territory) return point;
        const liberties = Array.from(this.groups[point.group].liberties);
        point.territory =
          liberties.reduce(
            (acc, { territory }) => (territory === "d" ? acc : acc + territory),
            0
          ) || point.stone;
        return point;
      };
      let boardState = pipeMap(joinEmptyPoints)(this.boardState);
      boardState = pipeMap(determineTerritory)(boardState);
      boardState = pipeMap(determineLife)(boardState);
      this.boardState = boardState;
      // submit board state to users
      this.turn = 0;
      return { ...this, territory: getTerritory(this) };
    },

    toggleTerritory: function (key) {
      if (this.turn) return { ...this, success: false };
      const groupKey = this.boardState[key].group;
      const group = this.groups[groupKey];
      const newStones = Array.from(group.stones).forEach((point) => {
        // console.log(point);
        if (point.stone) {
          return (point.territory = -1 * point.territory);
        }
        if (point.territory === "d") return (point.territory = 1);
        if (point.territory > 0) return (point.territory = -1);
        if (point.territory < 0) return (point.territory = "d");
      });
      this.groups[groupKey];
      return { ...this, territory: getTerritory(this) };
    },

    endGame: function () {
      // if boardState is approved calculate winner
      const [blackTerritory, whiteTerritory] = Object.values(
        this.boardState
      ).reduce(
        ([blackTerritory, whiteTerritory], { territory, stone }) => {
          if (territory === "d") return [blackTerritory, whiteTerritory];
          if (territory > 0) {
            if (stone === -1) return [blackTerritory + 2, whiteTerritory];
            return [blackTerritory + 1, whiteTerritory];
          }
          if (territory < 0) {
            if (stone === 1) return [blackTerritory, whiteTerritory + 2];
            return [blackTerritory, whiteTerritory + 1];
          }
        },
        [0, 0]
      );
      this.playerState.bScore = blackTerritory + this.playerState.bCaptures;
      this.playerState.wScore = whiteTerritory + this.playerState.wCaptures;
      const score =
        this.playerState.bScore - (this.playerState.wScore + this.komi);
      return { ...this, score, winner: score > 0 ? 1 : -1 };
    },

    // for playing historic games
    manualEnd: function ({ winner, score }) {
      this.turn = 0;
      this.winner = winner;
      this.score = score;
      return this;
    },
  };
};

const Point = ({ x, y, boardSize = 19 }) => {
  let point = {
    pos: { x, y },
    key: `${x}-${y}`,
    stone: 0, // can be 1, -1, 0,
    ko: false,
    legal: true,
    territory: 0,
    capturing: {
      "1": new Set(),
      "-1": new Set(),
    },
    group: null,
    neighbors: {
      top: x > 1 ? `${x - 1}-${y}` : null,
      btm: x < boardSize ? `${x + 1}-${y}` : null,
      rgt: y < boardSize ? `${x}-${y + 1}` : null,
      lft: y > 1 ? `${x}-${y - 1}` : null,
    },

    makeMove: function (Game) {
      this.stone = Game.turn;
      this.legal = false;
      if (this.capturing[this.stone].size) {
        Game = this.makeCaptures(Game);
      }
      Game = this.joinGroup({ point: this, Game });
      return this.checkCaptures(Game);
    },

    joinGroup: function ({ point, Game }) {
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
        getNeighbors({ point: this, Game }).forEach((neighbor) => {
          if (
            neighbor.stone === this.stone &&
            // this check prevents infinite call chains
            neighbor.group !== this.group
          ) {
            Game = neighbor.joinGroup({ point: this, Game });
          }
        });
      }
      return Game;
    },

    joinEmptyPoints: function ({ point, Game }) {
      if (point.group !== this.group || !point.group) {
        if (!point.group) {
          const { game, group } = Game.initGroup(point);
          this.group = group;
          Game = game;
        }
        Game.groups[point.group].stones.add(this);
        if (this.group !== point.group) {
          this.group = point.group;
        }
        getNeighbors({ point: this, Game }).forEach((neighbor) => {
          if (
            neighbor.stone === this.stone &&
            // this check prevents infinite call chains
            neighbor.group !== this.group
          ) {
            Game = neighbor.joinEmptyPoints({ point: this, Game });
          }
        });
        return Game;
      }
    },

    setLiberties: function (Game) {
      const neighbors = getNeighbors({ point: this, Game });
      const liberties = Game.groups[this.group].liberties;
      // if point is occupied remove it from liberties set of point group, else add it
      neighbors.forEach((neighbor) => {
        if (neighbor.stone !== 0) {
          liberties.delete(neighbor);
          Game.groups[neighbor.group].liberties.delete(this);
        }
        if (neighbor.stone === 0) {
          liberties.add(neighbor);
        }
      });
      return Game;
    },

    checkCaptures: function (game) {
      // if this stone has one liberty
      const liberties = game.groups[this.group].liberties;
      if (liberties.size === 1) {
        const lastLiberty = getSingleItemFromSet(liberties);
        lastLiberty.capturing[this.stone * -1].add(this.group);
      }
      if (liberties.size > 1) {
        liberties.forEach((liberty) =>
          liberty.capturing[this.stone * -1].delete(this.group)
        );
      }

      // if neighbors have one liberty
      const neighbors = getNeighbors({ point: this, Game: game }).filter(
        (neighbor) => neighbor.stone === -1 * this.stone
      );
      neighbors.forEach((neighbor) => {
        const liberties =
          game.groups[neighbor.group] && game.groups[neighbor.group].liberties;
        if (liberties && liberties.size === 1) {
          const lastLiberty = getSingleItemFromSet(liberties);
          lastLiberty.capturing[neighbor.stone * -1].add(neighbor.group);
        }
      });
      return game;
    },

    makeCaptures: function (game) {
      // for each group
      for (let [captureGroup, _] of this.capturing[this.stone].entries()) {
        const capturesSet = game.groups[captureGroup].stones;
        for (let [capture, _] of capturesSet.entries()) {
          game = capture.removeStone(game);
          if (capturesSet.size === 1) {
            const neighbors = getNeighbors({ point: this, Game: game });
            const liberties = neighbors.filter(
              (neighbor) => neighbor.stone === 0
            );
            const groupStones = neighbors.filter(
              (neighbor) => neighbor.stone === this.stone
            );
            if (liberties.length === 1 && groupStones.length === 0) {
              capture.ko = true;
              game.kos.push(capture.key);
            }
          }
        }
      }
      // points with stones cannot be played to capture
      this.capturing = { "1": new Set(), "-1": new Set() };
      return { ...game, boardState: { ...game.boardState, [this.key]: this } };
    },

    removeStone: function (game) {
      if ((this.stone = 0)) {
        return game;
      }
      // reset point
      this.stone = 0;
      this.group = null;
      this.capturing[game.turn] = new Set();
      // add captures
      const player = game.turn > 0 ? "b" : "w";
      game.playerState[`${player}Captures`] += 1;

      // add as liberty to neighbors
      const neighbors = getNeighbors({ point: this, Game: game }).filter(
        (neighbor) => neighbor.stone !== 0 && neighbor.group
      );
      neighbors.forEach((neighbor) => {
        game.groups[neighbor.group].liberties.add(this);
        neighbor.checkCaptures(game);
      });

      return { ...game, boardState: { ...game.boardState, [this.key]: this } };
    },
  };
  for (let [key, value] of Object.entries(point.neighbors)) {
    if (value) continue;
    delete point.neighbors[key];
  }
  return point;
};

module.exports = {
  Game,
  Point,
};
