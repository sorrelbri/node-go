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
    const roomIo = io.of(data.room);
    roomIo.on('connection', socket => {
      socket.emit('connected')
      socket.emit('new_user', data);
    })
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
