import config from '../config';
import Axios from 'axios';

const authEndpoint = `${config.apiAddress}/auth`;
const signupEndpoint = `${authEndpoint}/signup`
const loginEndpoint = `${authEndpoint}/login`

const loginService = () => {

}

const signupService = async (formData) => {
  const response = await Axios.post(signupEndpoint, {...formData })
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