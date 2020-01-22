// @flow
import type { state, action } from '../stateReducer';
import { stateReducer } from '../stateReducer';

export const roomsReducer = (state: state, action: action):state => {
  switch(action.message) {

    case 'SET_ROOMS':
      const rooms = action.body;
      return {...state, rooms};

    case 'JOIN_ROOM': {
      // SET MESSAGES
      const stateWithMessages = action.body.messages.length ? setMessages(state, action.body) : state;
      
      // SET CURRENT ROOM

      // if (!data.roomGames.length) {
      //   const errorAction = {
      //     type: 'ERR',
      //     message: 'JOIN_ROOM',
      //     body: { joinRoomError: 'Game room has no games' }
      //   }
      //   return stateReducer(stateWithMessages, errorAction);
      // }

      // SET GAMES
      return stateWithMessages;
    }

      
    default:
      return state;
  }
}

function setMessages(state, body) {
  const messageAction = {
    type: 'MESSAGES',
    message: 'SET_MESSAGES',
    body: body.messages
  }
  return stateReducer(state, messageAction)
}