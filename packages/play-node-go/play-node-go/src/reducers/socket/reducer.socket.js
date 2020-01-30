// @flow
import type { state, action } from '../reducer';
import { stateReducer } from '../reducer';
const io = require('../../io');

export const socketReducer = (state: state, action: action):state => {
  switch(action.message) {

    case 'CONNECTED':
      console.log(action.body.nsp)
      return {...state, connect: { type: 'home', location: action.body.nsp } }

    case 'LAUNCH': {
      const {nsp, dispatch} = action.body;
      const launchedSocket = io.launch(nsp, dispatch);
      return {...state, socket: launchedSocket};
    }

    case 'CONNECT_ROOM': {
      const {user, room, dispatch} = action.body;
      let priorSocket = state.socket;
      if (!priorSocket.nsp) {
        priorSocket = io.launch('', dispatch)
      }
      if (priorSocket.nsp !== `/${room}`) {
        priorSocket.emit('connect_room', {user, room});
        priorSocket.close();
      }
      const socket = io.launch(room, dispatch);
      return {...state, socket}
    }

    case 'CONNECT_GAME': {
      return connectGame(state, action);
    }

    default:
      return state;
  }
}

function connectGame (state, action) {
  const { user, game, dispatch } = action.body;
  const priorSocket = state.socket;
  let updatedState;
  if ( !priorSocket.nsp || priorSocket.nsp !== `/${game.room}` ) {
    const connectRoomAction = {
      type: 'SOCKET',
      message: 'CONNECT_ROOM',
      body: { user, room: game.room, dispatch}
    }
    updatedState = stateReducer(state, connectRoomAction);
    
  }
  if (!updatedState) updatedState = {...state};
  const socket = updatedState.socket;
  socket.emit('connect_game', {user, game});
  return {...updatedState};
}