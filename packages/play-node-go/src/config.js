const production = {
  apiAddress: 'https://node-go-api.herokuapp.com',
  endpoint: 'https://play-node-go.herokuapp.com'
}

const development = {
  apiAddress: 'http://localhost:8000',
  endpoint: 'http://localhost:3000'
}

const config = process.env.REACT_APP_ENVIRONMENT === 'production' 
  ? production
  : development

export default {
  ...config
}