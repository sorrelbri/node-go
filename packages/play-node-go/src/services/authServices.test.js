import authServices from './authServices';

const signupService = authServices.signupService;
const loginService = authServices.loginService;

const newUserFormData = {
  username:'newUser',
  password:'password',
  confirmPassword:'password',
  email:'user@example.com'
}

describe('signupService', () => {
  it('', () => {
  });
});

describe('loginService', () => {
  it('login is successful', async () => {
    // const response = await loginService(newUserFormData);
    // console.log(response);
  });
});