import socketIOClient from 'socket.io-client';
import config from './config';

const launch = (nsp, dispatch) => {
  const socket = socketIOClient(`${config.socketAddress}/${nsp}`);
  
  socket.on('connected', () => {
    dispatch({ type:'SOCKET', message:'CONNECTED', body:{nsp: socket.nsp} });
  });
  socket.on('connect_error', err => {
    dispatch({ type: 'ERR', message:'SOCKET_ERROR', body: { socketError: err }});
  });
  socket.on('error', err => {
    dispatch({ type: 'ERR', message:'SOCKET_ERROR', body: { socketError: err } });
  });
  
  socket.on('room_connected', (data) => {
    dispatch({ type: 'ROOMS', message: 'CONNECT_ROOM', body: data });
  });
  
  socket.on('new_user', (data) => {
    console.log('new_user received')
    dispatch({ type: 'ROOMS', message: 'NEW_USER', body: data })
  })

  socket.on('game_connected', (data) => {
    console.log(data)
    console.log('game_connected received')
    dispatch({ type: 'GAMES', message: 'UPDATE_BOARD', body: data })
  })
  
  socket.on('update_board', (data) => {
    console.log(data)
    console.log('update_board received')
    dispatch({ type: 'GAMES', message: 'UPDATE_BOARD', body: data.board })
  })

  return socket;
}

export {
  launch
}