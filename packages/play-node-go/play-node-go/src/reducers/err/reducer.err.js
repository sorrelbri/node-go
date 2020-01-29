// @flow
import type { state, action } from '../reducer';

export const errorReducer = (state: state, action: action):state => {
  switch (action.message) {
    case 'AUTH_ERROR':
      return authErrorReducer(state, action);

    case 'JOIN_ROOM_ERROR':
      return joinRoomErrorReducer(state, action);
    
      case 'JOIN_GAME_ERROR':
      return joinGameErrorReducer(state, action);

    default:
      return state;
  } 
}

function authErrorReducer(state: state, action: action): state {
  const auth = action.body.authError;
  return {...state, errors: {auth} };
}

function joinRoomErrorReducer(state: state, action: action): state {
  const joinRoom = action.body.joinRoomError;
  return { ...state, errors: {joinRoom} }
}

function joinGameErrorReducer(state: state, action: action): state {
  const joinGame = action.body.joinGameError;
  return { ...state, errors: {joinGame} }
}