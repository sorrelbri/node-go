import authServices from './authServices';

const signupService = authServices.signupService;
const loginService = authServices.loginService;

const newUserFormData = {
  username:'newUser',
  password:'password',
  passwordConfirm:'password',
  email:'user@example.com'
}

describe('signupService', () => {
  it('signup returns 200', async () => {
    const response = await signupService(newUserFormData);
    console.log(response)
    expect(response.status).equal('200');
  });
});

describe('loginService', () => {
  it('', () => {

  });
});