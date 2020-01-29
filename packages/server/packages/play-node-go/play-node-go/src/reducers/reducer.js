// @flow
import { initState } from './init/reducer.init';
import { authReducer } from './auth/reducer.auth';
import { errorReducer } from './err/reducer.err';
import { indexReducer } from './index/reducer.index';
import { roomsReducer } from './rooms/reducer.rooms';
import { messagesReducer } from './messages/reducer.messages';
import { gamesReducer } from './games/reducer.games';
import { socketReducer } from './socket/reducer.socket';

export type state = {
  user: {},
  errors: {},
  messages: [],
  state: {}
}

export type action = {
  type: string,
  message: ?string,
  body: {} | Array<{}>,
}

export const stateReducer = (state: state, action: action): state => {
  const errorStrippedState = stripErrors({...state});
  
  switch (action.type) {
    case 'INIT': return initState();
    
    case 'AUTH':
      return authReducer(errorStrippedState, action);

    case 'GAMES':
      return gamesReducer(errorStrippedState, action);

    case 'INDEX':
      return indexReducer(errorStrippedState, action);

    case 'MESSAGES':
      return messagesReducer(errorStrippedState, action);

    case 'ROOMS':
      return roomsReducer(errorStrippedState, action);

    case 'SOCKET':
      return socketReducer(errorStrippedState, action);

    case 'ERR':
      return errorReducer(errorStrippedState, action);

    default: return state;
  }
}

function stripErrors(state: state): state {
  return {...state, errors: {}}
}