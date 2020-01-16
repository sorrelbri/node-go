// @flow
import { initState } from './init/stateReducer.init';

export type state = {
  user: {}
}

type action = {
  type: string
}

export const stateReducer = (state: state, action: action): state => {
  switch (action.type) {
    case 'INIT': return initState();
  
    default: return state;
  }
}