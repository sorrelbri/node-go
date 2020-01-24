import config from '../../config';

const apiAddress = config.apiAddress;
const roomsAddress = `${apiAddress}/rooms`

var headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Sec-Fetch-Site', 'cross-site')

const indexService = async () => {
  const response = await fetch(roomsAddress, 
    {method: 'GET', credentials: 'include', headers: headers}
  )
  .then(res => res.text())
  .then(text => JSON.parse(text))
  .catch(err =>  err);
  
  return response;
}

const getRoomService = async (roomIndex) => {
  const response = await fetch(`${roomsAddress}/${roomIndex}`, 
    {method: 'GET', credentials: 'include', headers: headers}
  )
  .then(res => res.text())
  .then(text => JSON.parse(text))
  
  .then(obj => {
    obj.games = obj.roomGames.map(game => {
      delete Object.assign(game, {boardSize: game.board_size }).board_size;
      delete Object.assign(game, {playerBlack: game.player_black }).player_black;
      delete Object.assign(game, {playerBlackRank: game.player_black_rank }).player_black_rank;
      delete Object.assign(game, {playerWhite: game.player_white }).player_white;
      delete Object.assign(game, {playerWhiteRank: game.player_white_rank }).player_white_rank;
      delete Object.assign(game, {winType: game.win_type }).win_type;

      return game;
    })
    return obj;
  })
  .catch(err => err);

  return response;
}
  
export default {
  indexService,
  getRoomService
}