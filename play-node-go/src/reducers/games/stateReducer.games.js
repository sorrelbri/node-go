// @flow
import type { state, action } from '../stateReducer';
import { stateReducer } from '../stateReducer';

export const gamesReducer = (state: state, action: action):state => {
  switch(action.message) {

    case 'SET_GAMES':
      const games = action.body;
      return {...state, games};

      
    default:
      return state;
  }
}