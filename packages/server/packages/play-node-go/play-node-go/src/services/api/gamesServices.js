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
  .then(obj => {
    // Reformat from SQL coluumn name convention to JS
    delete Object.assign(obj.game, {applicationVersion: obj.game.application_version }).application_version;
    delete Object.assign(obj.game, {boardSize: obj.game.board_size }).board_size;
    delete Object.assign(obj.game, {playerBlack: obj.game.player_black }).player_black;
    delete Object.assign(obj.game, {playerBlackRank: obj.game.player_black_rank }).player_black_rank;
    delete Object.assign(obj.game, {playerWhite: obj.game.player_white }).player_white;
    delete Object.assign(obj.game, {playerWhiteRank: obj.game.player_white_rank }).player_white_rank;
    delete Object.assign(obj.game, {capturesWhite: obj.game.captures_white }).captures_white;
    delete Object.assign(obj.game, {capturesBlack: obj.game.captures_black }).captures_black;
    delete Object.assign(obj.game, {mainTime: obj.game.main_time }).main_time;
    delete Object.assign(obj.game, {timePeriod: obj.game.time_period }).time_period;
    delete Object.assign(obj.game, {periodLength: obj.game.period_length }).period_length;
    delete Object.assign(obj.game, {overtimePeriod: obj.game.overtime_period }).overtime_period;
    delete Object.assign(obj.game, {overtimeLength: obj.game.overtime_length }).overtime_length;
    delete Object.assign(obj.game, {winType: obj.game.win_type }).win_type;

    return obj;
  })
  .catch(err => err);

  return response;
}
  
export default {
  getGameService
}