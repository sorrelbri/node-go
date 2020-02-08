import { stateReducer } from '../reducer';

export const messagesReducer = (state, action) => {
  switch(action.message) {

    case 'SET_MESSAGES':
      const messages = action.body;
      return {...state, messages};

      
    default:
      return state;
  }
}