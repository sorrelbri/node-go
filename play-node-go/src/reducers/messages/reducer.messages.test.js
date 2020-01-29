import {stateReducer} from '../reducer';
import { initState } from '../init/reducer.init';

const messagesData = [
  {
  "content": "Hey! Welcome to the general room!", "username": "userOne", "admin": true
  }
];

it('default returns state unaltered', () => {
  const state = initState();
  const action = {type: 'MESSAGES', message: '', body: messagesData};
  expect(stateReducer(state, action)).toEqual(state);
})

it('set messages returns state with messages', () => {
  const state = initState();
  const action = {type: 'MESSAGES', message: 'SET_MESSAGES', body: messagesData};
  expect(stateReducer(state, action)).toEqual({...state, messages: messagesData});
})