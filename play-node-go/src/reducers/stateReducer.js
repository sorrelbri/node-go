// @flow
import { initState } from './init/stateReducer.init';
import { authReducer } from './auth/stateReducer.auth';
import { errorReducer } from './err/stateReducer.err';
import { indexReducer } from './index/stateReducer.index';
import { roomsReducer } from './rooms/stateReducer.rooms';

export type state = {
  user: {},
  errors: {}
}

export type action = {
  type: string,
  message: ?string,
  body: {},
}

export const stateReducer = (state: state, action: action): state => {
  const errorStrippedState = stripErrors({...state});
  
  switch (action.type) {
    case 'INIT': return initState();
    
    case 'AUTH':
      return authReducer(errorStrippedState, action);

    case 'INDEX':
      return indexReducer(errorStrippedState, action);

    case 'ROOMS':
      return roomsReducer(errorStrippedState, action);

    case 'ERR':
      return errorReducer(errorStrippedState, action);

    default: return state;
  }
}

function stripErrors(state: state): state {
  return {...state, errors: {}}
}