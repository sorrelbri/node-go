const production = {
  apiAddress: null,
  endpoint: null
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