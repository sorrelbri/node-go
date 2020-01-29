// @flow
import type { state, action } from '../reducer';
import { stateReducer } from '../reducer';

export const messagesReducer = (state: state, action: action):state => {
  switch(action.message) {

    case 'SET_MESSAGES':
      const messages = action.body;
      return {...state, messages};

      
    default:
      return state;
  }
}