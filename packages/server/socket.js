// TODO const someSocketLogic = require('./middleware/socketssockets/...');
const socketIO = require('socket.io');
const io = socketIO({ cookie: false });

const gameQueries = require('./data/queries/game');
const gameServices = require('./services/gameServices');

io.on('connection', socket=> {
  socket.emit('connected', {message: 'socket connected'});
  socket.on('connect_room', data => {
    if (data.user && data.user.email) {
      delete data.user.email;
    }
    const room= data.room;
    const roomIo = io.of(room);
    roomIo.on('connection', socket => {
      socket.emit('connected')
      socket.emit('new_user', data);
      socket.on('connect_game', data => {
        const game = `game-${data.game.id}`;
        socket.join(game, async () => {
          // ! temp 
          gameServices.initGame({id: data.game.id})
          // ! end-temp
          const gameData = await gameServices.getBoard(data.game.id);
          io.of(room).to(game).emit('game_connected', gameData)
        });
      });
      socket.on('make_move', data => {
        
        const { user, move, board, game, room } = data;
        const gameNsp = `game-${data.game.id}`;
        
        try {
          const updatedBoard = gameServices.makeMove(1, move);
          socket.join(gameNsp, () => {
            io.of(room).to(gameNsp).emit('update_board', updatedBoard)
          });
        }
        catch (err) {
          socket.join(gameNsp, () => {
            io.of(room).to(gameNsp).emit('error', err)
          });

        }
      })
    });
  })
})

module.exports = {
  io
}
