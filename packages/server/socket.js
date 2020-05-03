// TODO const someSocketLogic = require('./middleware/socketssockets/...');
const socketIO = require('socket.io');
const io = socketIO({ cookie: false });

const gameQueries = require('./data/queries/game');
const gameServices = require('./services/gameServices');

io.on('connection', async socket=> {
  socket.emit('connected', {message: 'socket connected'});
  socket.on('connect_room', async data => {
    if (data.user && data.user.email) {
      delete data.user.email;
    }
    const room = data.room;
    const roomIo = io.of(room);
    roomIo.on('connection', async socket => {
      socket.emit('connected')
      socket.emit('new_user', data);
      socket.on('connect_game', data => {
        const game = `game-${data.game.id}`;
        socket.join(game, async () => {
          // ! temp 
          await gameServices.initGame({id: data.game.id})
          // ! end-temp
          const gameData = await gameServices.getDataForUI(data.game.id);
          io.of(room).to(game).emit('game_connected', gameData)
        });
      });
      socket.on('make_move', async data => {
        const { user, move, board, game, room } = data;
        const gameNsp = `game-${data.game.id}`;
        
        try {
          const result =  await gameServices.makeMove({ id: 1, move });
          console.log(result)
          let socketAction = 'update_board';
          if (result.message) socketAction = 'error';
          socket.join(gameNsp, () => {
            io.of(room).to(gameNsp).emit(socketAction, result)
          });
        }
        catch (e) {
          socket.join(gameNsp, () => {
            io.of(room).to(gameNsp).emit('error', e)
          });

        }
      })
    });
  })
})

module.exports = {
  io
}
