// @flow
import type { state, action } from '../stateReducer';
import { stateReducer } from '../stateReducer';

export const messagesReducer = (state: state, action: action):state => {
  switch(action.message) {

    case 'SET_MESSAGES':
      const rooms = parseData(action.body);
      return {...state, rooms};

      
    default:
      return state;
  }
}