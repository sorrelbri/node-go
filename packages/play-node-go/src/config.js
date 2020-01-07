const production = {
  apiAddress: null
}

const development = {
  apiAddress: 'http://localhost:8000'
}

const config = process.env.REACT_APP_ENVIRONMENT === 'production' 
  ? production
  : development

export default {
  ...config
}