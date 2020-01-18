// @flow
import type { state, action } from '../stateReducer';

export const indexReducer = (state: state, action: action):state => {
  switch(action.message) {

    case 'SET_USER':
      const parsedData = indexDataParse(action.body);
      return state;
      
    default: 
      return state;
  }
}

function indexDataParse(indexData) {
  console.log(indexData)
}