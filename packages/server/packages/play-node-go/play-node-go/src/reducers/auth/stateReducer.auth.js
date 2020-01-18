// @flow
import type { state, action } from '../stateReducer';

export const authReducer = (state: state, action: action):state => {
  switch (action.message) {
    case 'LOGIN':
      return loginReducer(state, action);
      
    case 'SIGNUP':
      return signupReducer(state, action);

    case 'LOGOUT':
      return state;

    default:
      return state;
  } 
}

function loginReducer(state: state, action: action): state {
  const userCredentials = action.body;


  return state;
}

function signupReducer(state: state, action: action): state {
  const newUser = action.body;
  return {...state, user: newUser };  
}