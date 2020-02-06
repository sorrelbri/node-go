import {authReducer} from './reducer.auth';

const newCredentials = {
  username: 'newUsername7',
  email: 'example7@test.com',
  password: 'newPass1',
  confirmPassword: 'newPass1'
}

const signupAction = {
  body: newCredentials,
  message: 'SIGNUP',
  type: 'AUTH'
}

const state = {
  user: null,
  errors: {}
}

it('return ', async () => {
  
  
})