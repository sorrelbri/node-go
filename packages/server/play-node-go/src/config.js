import runtimeEnv from '@mars/heroku-js-runtime-env';
const env = runtimeEnv();

const production = {
  apiAddress: 'https://node-go-api.herokuapp.com/api/v1',
  endpoint: 'https://play-node-go.herokuapp.com',
  authAddress: 'https://play-node-go.herokuapp.com',
  socketAddress: 'https://node-go-api.herokuapp.com'
}

const development = {
  apiAddress: 'http://localhost:8000/api/v1',
  authAddress: 'http://localhost:8000/auth',
  endpoint: 'http://localhost:3000',
  socketAddress: 'http://localhost:8000'
}

const config = env.REACT_APP_ENVIRONMENT === 'production' 
  ? production
  : development

export default {
  ...config
}