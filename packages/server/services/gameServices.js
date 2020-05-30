const Game = require("./Game").Game;

const GameService = (moveQueries) => {
  const storeGame = (game) => {
    gamesInProgress[game.id] = Game(game);
    return gamesInProgress[game.id];
  };
  const gamesInProgress = {};

  return {
    initGame({ id, gameRecord = [], ...gameData }) {
      if (gamesInProgress[id]) return this.getDataForUI(id);
      if (gameRecord.length) {
        console.log("here");
        gamesInProgress[id] = Game({ gameData, gameRecord });
      } else {
        gamesInProgress[id] = Game({ gameData }).initGame();
      }
      return this.getDataForUI(id);
    },

    async makeMove({ id, move }) {
      if (!gamesInProgress[id]) storeGame({ id }).initGame();
      gamesInProgress[id] = gamesInProgress[id].makeMove(move);
      if (gamesInProgress[id].success === false)
        return { message: "illegal move" };
      try {
        if (moveQueries) {
          const priorMove = gamesInProgress[id].gameRecord.length;
          const moveInsert = {
            gameId: id,
            player: move.player,
            x: move.pos.x,
            y: move.pos.y,
            gameRecord: true,
            priorMove,
          };
          let moveDbResult;
          moveDbResult = await moveQueries.addMove(moveInsert);
        }
      } catch {
        gamesInProgress[id].returnToMove(-1);
      } finally {
        return this.getDataForUI(id);
      }
    },

    getDataForUI: (id) => {
      return {
        board: gamesInProgress[id].legalMoves,
        ...gamesInProgress[id].getMeta(),
      };
    },

    dropGame: (id) => {
      return { message: `${delete gamesInProgress[id]}` };
    },

    getAllGames: () => {
      return gamesInProgress;
    },
  };
};

module.exports = GameService;
