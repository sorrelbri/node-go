import {stateReducer} from './stateReducer';

it('default returns state unaltered', () => {
  const state = {data: 'example'};
  const action = {type: ''};
  expect(stateReducer(state, action)).toBe(state);
});

