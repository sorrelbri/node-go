// TODO const someSocketLogic = require('./middleware/socketssockets/...');
const socketIO = require('socket.io');
const io = socketIO({ cookie: false });

const gameQueries = require('./data/queries/game');

io.on('connection', ()=> {
  io.emit('connected', {message: 'socket connected'});
})

enableRoomSocket = (roomId) => {
  const roomSocket = io.of(roomId);
  roomSocket.on('connection', (socket) => {
    
    //! Join Game Request queries db for game, ensures unique player joining
    socket.on('join_game_request', async data => {
      const gameRequest = await logJoinGameRequest(data);

      if (gameRequest.err) {
        roomSocket.emit('join_game_request_error', gameRequest.err);
      }

      roomSocket.emit('join_game_request', gameRequest);
    });

  });
  return roomSocket;
}

module.exports = {
  io,
  enableRoomSocket
}

async function logJoinGameRequest (data) {
  const {user, game} = data;
  const requestedGame = await gameQueries.findGameById(game.id);
  
  if (requestedGame.user_black === user.id) {
    return { err: 'players must be unique' }
  }

  const requestingUser = {...user};
  delete requestingUser.email;
  return { requestingUser, requestedGame }
}