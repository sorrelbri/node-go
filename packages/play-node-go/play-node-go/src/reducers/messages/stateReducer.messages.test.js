import {stateReducer} from '../stateReducer';
import { initState } from '../init/stateReducer.init';

const messagesData = [];

it('default returns state unaltered', () => {
  const state = initState();
  const action = {type: 'MESSAGES', message: '', body: JSON.stringify(messagesData)};
  expect(stateReducer(state, action)).toEqual(state);
})