const Game = require("./Game").Game;

const GameService = ({ moveQueries, gameQueries }) => {
  const storeGame = (game) => {
    gamesInProgress[game.id] = Game(game);
    return gamesInProgress[game.id];
  };
  const gamesInProgress = {};

  const storeMove = (gameId) => async ({ player, pos: { x, y } }) => {
    let move = { player, pos: { x, y } };
    try {
      if (moveQueries) {
        const { id } = await moveQueries.addMove({
          gameId,
          player,
          x,
          y,
          gameRecord: true,
          priorMove: null,
        });
        move.id = id;
        move.success = true;
      }
    } catch (e) {
      console.log(e);
      move.success = false;
    } finally {
      return move;
    }
  };

  return {
    initGame({ id, gameRecord = [], ...gameData }) {
      if (gamesInProgress[id]) return this.getDataForUI(id);
      if (gameRecord.length) {
        gamesInProgress[id] = Game({ gameData, gameRecord });
      } else {
        gamesInProgress[id] = Game({ gameData }).initGame();
      }
      return this.getDataForUI(id);
    },

    async makeMove({ id, move }) {
      // check cache
      if (!gamesInProgress[id]) {
        try {
          let gameRecord;
          if (moveQueries) {
            gameRecord = await moveQueries.findGameRecord(id);
          }
          storeGame({ id, gameRecord }).initGame();
        } catch {
          return { message: "error restoring game" };
        }
      }
      gamesInProgress[id] = await gamesInProgress[id].checkMove(move);
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
        territory: gamesInProgress[id].territory,
        ...gamesInProgress[id].getMeta(),
      };
    },

    dropGame: (id) => {
      return { message: `${delete gamesInProgress[id]}` };
    },

    getAllGames: () => {
      return gamesInProgress;
    },

    resign: ({ id, player }) => {
      // add resign gamesQueries
      return gamesInProgress[id].submitResign(player).getMeta();
    },

    async pass({ id, player }) {
      gamesInProgress[id] = gamesInProgress[id].submitPass(player);
      if (gamesInProgress[id].success === false)
        return { message: "illegal move" };
      try {
        if (moveQueries) {
          const priorMove = gamesInProgress[id].gameRecord.length;
          const movePass = {
            gameId: id,
            player,
            x: 0,
            y: 0,
            gameRecord: true,
            priorMove,
          };
          let moveDbResult;
          moveDbResult = await moveQueries.addMove(movePass);
        }
      } catch {
        gamesInProgress[id].returnToMove(-1);
      } finally {
        return this.getDataForUI(id);
      }
    },

    toggleTerritory({ id, point }) {
      gamesInProgress[id] = gamesInProgress[id].toggleTerritory(point);
      return this.getDataForUI(id);
    },

    async endGame({ id }) {
      gamesInProgress[id] = gamesInProgress[id].endGame();
      const { winner, score, playerState } = gamesInProgress[id];
      const { bCaptures, wCaptures } = playerState;
      const winType = winner > 0 ? "B+" : "W+";
      try {
        if (gameQueries) {
          const result = await gameQueries.endGame({
            id,
            winType,
            score,
            bCaptures,
            wCaptures,
          });
          console.log(result);
        }
      } catch (e) {
        console.log(e);
      }
      return this.getDataForUI(id);
    },
  };
};

module.exports = GameService;
