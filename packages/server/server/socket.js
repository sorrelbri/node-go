// TODO const someSocketLogic = require('./middleware/socketssockets/...');
const socketIO = require('socket.io');
const io = socketIO({ cookie: false });

const gameQueries = require('./data/queries/game');

io.on('connection', socket=> {
  socket.emit('connected', {message: 'socket connected'});
  socket.on('connect_room', data => {
    console.log(data)
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
        socket.join(game, () => {
          io.of(room).to(game).emit('game_connected', {})
        });
      });
    });
  })
})

const roomSocket = (roomId) => {
  
  const roomIo = io.of(roomId)
  roomIo.on('connection', socket => {
    console.log('connected room')
    socket.on('connect_room', data => {
      if (data.user && data.user.email) {
        delete data.user.email;
      }
      socket.emit('new_user', data);
    })
  })
  return roomIo;
}

module.exports = {
  io,
  roomSocket
}
