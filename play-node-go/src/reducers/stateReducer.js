// @flow
import { initState } from './init/stateReducer.init';
import { authReducer } from './auth/stateReducer.auth';

export type state = {
  user: {},
  errors: {}
}

export type action = {
  type: string,
  message: ?string,
  body: {}
}

export const stateReducer = (state: state, action: action): state => {
  const errorStrippedState = stripErrors({...state});
  
  switch (action.type) {
    case 'INIT': return initState();

    case 'AUTH':
      return authReducer(errorStrippedState, action);
  
    default: return state;
  }
}

function stripErrors(state: state): state {
  return {...state, errors: {}}
}