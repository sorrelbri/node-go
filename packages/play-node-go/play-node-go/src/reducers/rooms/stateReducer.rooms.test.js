import {stateReducer} from '../stateReducer';
import { initState } from '../init/stateReducer.init';

const roomsData = [
  {
    description: "A general place to play Go",
    id: 1,
    language: "EN",
    name: "main"
  }
]

it('default returns state with rooms added', () => {
  const state = initState();
  const action = {type: 'ROOMS', message: 'SET_ROOMS', body: JSON.stringify(roomsData)};
  expect(stateReducer(state, action)).toEqual({...state, rooms: roomsData});
});

