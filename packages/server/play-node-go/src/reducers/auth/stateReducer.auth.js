// @flow
import type { state, action } from '../stateReducer';

import authServices from '../../services/authServices';

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

async function signupReducer(state: state, action: action): state {
  const userCredentials = action.body;

  const signupResponse = await authServices.signupService(userCredentials);
  const errors = signupResponse.response ? signupResponse.response.data.errors : null;
  let responseUser;
  if (signupResponse.data) responseUser = {...signupResponse.data}
  if (errors) return {...state, errors: {authError: errors} };
  if (responseUser) return {...state, user: responseUser };
  return {...state, errors: {requestError: 'something went wrong'}};

  // returnstate;
}