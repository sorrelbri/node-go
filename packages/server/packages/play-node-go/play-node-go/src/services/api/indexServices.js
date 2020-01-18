import config from '../../config';

const apiAddress = config.apiAddress;

var headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Sec-Fetch-Site', 'cross-site')

const indexService = async () => {
  const response = await fetch(apiAddress, 
    {method: 'GET', credentials: 'include', headers: headers}
  )
  .then(res => {
    return res.text();
  }).catch(err => {
    return err;
  });
  return response;
}

export default {
  indexService
}