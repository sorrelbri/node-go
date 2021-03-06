// TODO const someSocketLogic = require('./middleware/sockets/...');
const socketIO = require("socket.io");
const io = socketIO({ cookie: false });

// const gameQueries = require('./data/queries/game');
const moveQueries = require("./data/queries/move");
const gameQueries = require("./data/queries/game");
const gameServices = require("./services/gameServices")({
  moveQueries,
  gameQueries,
});

io.on("connection", async (socket) => {
  socket.emit("connected", { message: "socket connected" });
  socket.on("connect_room", async (data) => {
    if (data.user && data.user.email) {
      delete data.user.email;
    }
    const room = data.room;
    const roomIo = io.of(room);
    roomIo.on("connection", async (socket) => {
      socket.emit("connected");
      socket.emit("new_user", data);
      socket.on("connect_game", (data) => {
        const game = `game-${data.game.id}`;
        socket.join(game, async () => {
          // TODO move this logic into game service
          const gameData = await gameQueries.findGameById(data.game.id);
          const convertWinType = (winType) => {
            if (winType.includes("B")) return 1;
            if (winType.includes("W")) return -1;
            if (winType.includes("0")) return "D";
            return "?";
          };
          gameData.winner = gameData.win_type
            ? convertWinType(gameData.win_type)
            : 0;
          const gameRecord = await moveQueries.findGameRecord(data.game.id);
          await gameServices.initGame({
            id: data.game.id,
            gameRecord,
            gameData,
          });
          const { board, ...meta } = await gameServices.getDataForUI(
            data.game.id
          );
          io.of(room).to(game).emit("game_connected", { board, meta });
        });
      });

      // MAKE MOVE
      socket.on("make_move", async (data) => {
        const { user, move, board, game, room } = data;
        const gameNsp = `game-${data.game.id}`;
        try {
          const { board, message, ...meta } = await gameServices.makeMove({
            id: data.game.id,
            move,
          });
          const socketAction = message ? "error" : "update_board";
          socket.join(gameNsp, () => {
            io.of(room)
              .to(gameNsp)
              .emit(socketAction, { board, meta, message });
          });
        } catch (e) {
          console.log(e);
          socket.join(gameNsp, () => {
            io.of(room).to(gameNsp).emit("error", e);
          });
        }
      });

      // RESIGN
      socket.on("resign", async ({ game, player }) => {
        const { id, room } = game;
        const gameNsp = `game-${id}`;
        try {
          const meta = await gameServices.resign({
            id,
            player,
          });
          socket.join(gameNsp, () => {
            io.of(room).to(gameNsp).emit("game_resign", meta);
          });
        } catch (e) {
          console.log(e);
        }
      });

      // PASS
      socket.on("pass", async ({ game, player }) => {
        const { id, room } = game;
        const gameNsp = `game${id}`;
        try {
          const {
            board,
            message,
            territory,
            ...meta
          } = await gameServices.pass({
            id,
            player,
          });
          socket.join(gameNsp, () => {
            io.of(room)
              .to(gameNsp)
              .emit("update_board", { board, message, territory, meta });
          });
        } catch (e) {
          console.log(e);
        }
      });

      // TOGGLE TERRITORY
      socket.on("toggle_territory", async ({ user, point, board, game }) => {
        const { id, room } = game;
        const gameNsp = `game${id}`;
        try {
          const {
            board,
            territory,
            ...meta
          } = await gameServices.toggleTerritory({
            id,
            point,
          });
          socket.join(gameNsp, () => {
            io.of(room)
              .to(gameNsp)
              .emit("update_board", { board, territory, meta });
          });
        } catch (e) {
          console.log(e);
        }
      });

      // END GAME
      socket.on("end_game", async ({ user, game }) => {
        const { id, room } = game;
        const gameNsp = `game${id}`;
        try {
          const { board, ...meta } = await gameServices.endGame({ id });
          socket.join(gameNsp, () => {
            io.of(room).to(gameNsp).emit("end_game", { board, meta });
          });
        } catch (e) {
          console.log(e);
        }
      });
    });
  });
});

module.exports = {
  io,
};
