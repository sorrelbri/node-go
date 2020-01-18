import runtimeEnv from '@mars/heroku-js-runtime-env';
const env = runtimeEnv();

const production = {
  apiAddress: 'https://node-go-api.herokuapp.com',
  endpoint: 'https://play-node-go.herokuapp.com'
}

const development = {
  authAddress: 'http://localhost:8000/auth',
  apiAddress: 'http://localhost:8000/api/v1',
  socketAddress: 'http://localhost:8000',
  endpoint: 'http://localhost:3000'
}

const config = env.REACT_APP_ENVIRONMENT === 'production' 
  ? production
  : development

export default {
  ...config
}