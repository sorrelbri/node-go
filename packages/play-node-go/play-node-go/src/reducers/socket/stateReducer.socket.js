// @flow
import type { state, action } from '../stateReducer';
import { stateReducer } from '../stateReducer';
const io = require('../../io');

export const socketReducer = (state: state, action: action):state => {
  switch(action.message) {

    case 'CONNECTED':
      return {...state, connect: 'home'}

    case 'LAUNCH': {
      const {socket, dispatch} = action.body;
      const launchedSocket = io.launch(socket, dispatch);
      return {...state, socket: launchedSocket};
    }

    case 'CONNECT_ROOM': {
      const {socket, ...data} = action.body;
      // if (Object.entries(state.socket)) {
      //   state.socket.close();
      // }
      socket.emit('connect_room', data);
      return {...state, socket, connect:''};
    }
    
    default:
      return state;
  }
}