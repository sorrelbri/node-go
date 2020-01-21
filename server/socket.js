// TODO const someSocketLogic = require('./middleware/socketssockets/...');
const socketIO = require('socket.io');
const io = socketIO({ cookie: false });

io.on('connection', ()=> {
  io.emit('connected', {message: 'socket connected'});
})

enableRoomSocket = (roomId) => {
  const roomSocket = io.of(roomId);
  roomSocket.on('connection', () => {
    console.log(`Socket connected at room ${roomId}`);
  });
  return roomSocket;
}

module.exports = {
  io,
  enableRoomSocket
}