// @flow
import type { state, action } from '../reducer';

export const authReducer = (state: state, action: action):state => {
  switch (action.message) {
    case 'LOGIN':
      return loginReducer(state, action);
      
    case 'SIGNUP':
      return loginReducer(state, action);

    case 'LOGOUT':
      return state;

    default:
      return state;
  } 
}

function loginReducer(state: state, action: action): state {
  const newUser = action.body;
  return {...state, user: newUser };  
}