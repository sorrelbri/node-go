//@ flow

import type { state } from '../stateReducer';

export const initState = (): state => {
  return {
    user: null
  };
}