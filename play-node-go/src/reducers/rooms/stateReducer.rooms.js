// @flow
import type { state, action } from '../stateReducer';

export const roomsReducer = (state: state, action: action):state => {
  switch(action.message) {

    case 'SET_ROOMS':
      const rooms = roomsParse(action.body);
      return {...state, rooms};
      
    default:
      return state;
  }
}

function roomsParse(roomsData) {
  const rooms = JSON.parse(roomsData);
  return rooms.rooms
}