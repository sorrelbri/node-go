// @flow
import type { state, action } from '../stateReducer';

export const indexReducer = (state: state, action: action):state => {
  switch(action.message) {

    case 'SET_USER':
      const user = indexDataParse(action.body);
      return {...state, user};
      
    default: 
      return state;
  }
}

function indexDataParse(indexData) {
  const user = JSON.parse(indexData);
  return user
}