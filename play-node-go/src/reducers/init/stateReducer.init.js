//@ flow

import type { state } from '../stateReducer';
const socket = require('../../io');

export const initState = (): state => {
  return {
    user: { username: '', email: '', id: 0 },
    errors: {},
    currentRoom: { description: '', id: 0, language: '', name: '' },
    messages: [ { 
      admin: false, content: '', username: ''
    } ],
    games: [ { 
      boardSize: 0, handicap: 0, id: 0, komi: 0.0, open: false, 
      playerBlack: '', playerBlackRank: '', playerWhite: '',
      playerWhiteRank: '', winType: null
    } ],
    joinGame: {},
    socket: {
      connected: false,
      nsp: ''
    },
    connect: { location: '', type: '' }
  };
}