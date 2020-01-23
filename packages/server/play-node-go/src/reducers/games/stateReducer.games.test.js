import {stateReducer} from '../stateReducer';
import { initState } from '../init/stateReducer.init';

const gamesData = [
  { 
    komi:6.5, handicap:0, board_size:19,
    player_black:"anon", player_white:"anon",
    player_black_rank:"K3", player_white_rank:"K2"
  }
];

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