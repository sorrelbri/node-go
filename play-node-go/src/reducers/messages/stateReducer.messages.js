// @flow
import type { state, action } from '../stateReducer';
import { stateReducer } from '../stateReducer';

export const messagesReducer = (state: state, action: action):state => {
  switch(action.message) {

    case 'SET_MESSAGES':
      const messages = action.body;
      return {...state, messages};

      
    default:
      return state;
  }
}