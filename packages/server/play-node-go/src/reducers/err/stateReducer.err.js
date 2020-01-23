// @flow
import type { state, action } from '../stateReducer';

export const errorReducer = (state: state, action: action):state => {
  switch (action.message) {
    case 'AUTH_ERROR':
      return authErrorReducer(state, action);

    case 'JOIN_ROOM_ERROR':
      return joinRoomErrorReducer(state, action);

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