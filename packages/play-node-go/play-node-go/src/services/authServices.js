import config from '../config';

const authEndpoint = config.authAddress;
const signupEndpoint = `${authEndpoint}/signup`
const loginEndpoint = `${authEndpoint}/login`

var headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Sec-Fetch-Site', 'cross-site')

const loginService = () => {

}

const signupService = async (formData) => {
  const response = await fetch(signupEndpoint, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(formData),
    headers: headers
  })
    .then(res => {
    return res;
  }).catch(err => {
    return err;
  });
  return response;
}

export default {
  loginService,
  signupService
}