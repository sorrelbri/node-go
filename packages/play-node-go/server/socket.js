// TODO const someSocketLogic = require('./middleware/socketssockets/...');
const socketIO = require('socket.io');
const io = socketIO({ cookie: false });

const gameQueries = require('./data/queries/game');

io.on('connection', ()=> {
  io.emit('connected', {message: 'socket connected'});
})

const enableRoomSocket = (roomId) => {
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

const enableGameSocket = (roomId, gameId) => {
  const gameSocket = io.of(roomId);
  gameSocket.on('connection', (socket) => {
    socket.join(gameId);
    socket.to(gameId).emit(`joined room ${gameId}`)
    console.log(socket)
  });


  return gameSocket;
}

module.exports = {
  io,
  enableRoomSocket,
  enableGameSocket
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