// @flow
import type { state, action } from '../stateReducer';

export const errorReducer = (state: state, action: action):state => {
  switch (action.message) {
    case 'AUTH_ERROR':
      return authErrorReducer(state, action);

    default:
      return state;
  } 
}

function authErrorReducer(state: state, action: action): state {
  const auth = action.body.authError;
  return {...state, errors: {auth} };
}