//@ flow

import type { state } from '../stateReducer';
const socket = require('../../io');

export const initState = (): state => {
  return {
    user: {},
    errors: {},
    currentRoom: {},
    messages: {},
    games: {},
    joinGame: {},
    socket: {}
  };
}