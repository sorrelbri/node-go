import socketIOClient from 'socket.io-client';
import config from './config';


const launch = (socket, dispatch) => {

  socket.on('connected', () => {
    dispatch({type:'SOCKET', message:'CONNECTED', body:{}});
  });
  socket.on('connect_error', err => {
    dispatch({type: 'ERR', message:'SOCKET_ERROR', body: {socketError: err}});
  });
  socket.on('error', err => {
    dispatch({type: 'ERR', message:'SOCKET_ERROR', body: {socketError: err}});
  });

  socket.on('room_connected', (data) => {
    dispatch({type: 'ROOM', message: 'CONNECT_ROOM', body: data});
  });

  socket.on('new_user', (data) => {
    console.log(data)
  })

  return socket;
}

export {
  launch
}