import config from '../../config';

const apiAddress = config.apiAddress;
const gamesAddress = `${apiAddress}/games`

var headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Sec-Fetch-Site', 'cross-site')

const getGameService = async (gameIndex) => {
  const response = await fetch(`${gamesAddress}/${gameIndex}`, 
    {method: 'GET', credentials: 'include', headers: headers}
  )
  .then(res => res.text())
  .then(text => JSON.parse(text))
  .catch(err => err);

  return response;
}
  
export default {
  getGameService
}