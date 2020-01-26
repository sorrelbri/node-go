// TODO const someSocketLogic = require('./middleware/socketssockets/...');
const socketIO = require('socket.io');
const io = socketIO({ cookie: false });

const gameQueries = require('./data/queries/game');

io.on('connection', socket=> {
  socket.emit('connected', {message: 'socket connected'});

  socket.on('connect_room', data => {
    const { user, room } = data;
    const roomIo = io.of(room);
    roomIo.emit('new_user', user)
    // roomIo.on('connection', roomSocket => {
    // })
  });
})

const roomSocket = (roomId) => {
  const roomIo = io.of(roomId)
  roomIo.on('connection', socket => {
    console.log('connected')
    socket.on('connect_room', data => {
      console.log(data)
    })
  })
}

module.exports = {
  io,
  roomSocket
}
