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
  const signupResponse = action.body;
  let error;
  
  if (signupResponse.response) {
    error = signupResponse.response.data.errors;
  }
  let responseUser;
  if (signupResponse.data) {
    responseUser = {...signupResponse.data}
  }

  if (error) {
    const errors = error.reduce((errorObject, error) => errorObject[Object.keys(error)[0] = error])
    return {...state, errors };
  }

  if (responseUser) {
    return {...state, user: responseUser };
  }
  
  return {...state, errors: {requestError: 'something went wrong'}};
}