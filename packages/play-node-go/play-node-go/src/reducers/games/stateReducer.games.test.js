import {stateReducer} from '../stateReducer';
import { initState } from '../init/stateReducer.init';

const gamesData = [
  { 
    komi:6.5, handicap:0, board_size:19,
    player_black:"anon", player_white:"anon",
    player_black_rank:"K3", player_white_rank:"K2"
  }
];

const activeGameData = {
  game: {
    id: 1,
    application: "node-go",
    application_version: "0.1.0",
    board_size: 19,
    komi: 6.5,
    handicap: 0,
    open: false,
    win_type: null,
    player_black: "user-one",
  player_black_rank: "UR",
  player_white: "user-two",
  player_white_rank: "UR",
  black_captures: null,
  white_captures: null,
  score: null,
  description: null,
  event: null,
  round: null,
  name: null,
  room: 1,
  main_time: "untimed",
  time_period: 1,
  period_length: 0,
  overtime: "untimed",
  overtime_period: 0,
  overtime_length: 0
  },
  record: []
}

it('default returns state unaltered', () => {
  const state = initState();
  const action = {type: 'GAMES', message: '', body: gamesData};
  expect(stateReducer(state, action)).toEqual(state);
})

it('set games returns state with games', () => {
  const state = initState();
  const action = {type: 'GAMES', message: 'SET_GAMES', body: gamesData};
  expect(stateReducer(state, action)).toEqual({...state, games: gamesData});
})

it('active game returns state with active game details', () => {
  const state = initState();
  const action = {type: 'GAMES', message: 'SET_ACTIVE', body: activeGameData};
  expect(stateReducer(state, action)).toEqual({...state, active: activeGameData});
})