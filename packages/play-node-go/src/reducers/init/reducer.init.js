//@ flow

import type { state } from '../reducer';

export const initState = (): state => {
  return {
    active: {
      game: {
        id: 0, room: 0, 
        mainTime: '', timePeriod: 0, periodLength: 0, overtime: '', overtimePeriod: 0, overtimeLength: 0,
        application: '', applicationVersion: '', open: false, description: null,
        event: null, round: null, name: null, 
        winType: null, capturesBlack: null, capturesWhite: null, score: null,
        boardSize: 0, komi: 0.0, handicap: 0,
        playerBlack: '', playerBlackRank: '', playerWhite: '', playerWhiteRank: '',
      },
      record: []
    },

    board: {},
    
    connect: { location: '', type: '' },
    
    currentRoom: { 
      description: '', id: 0, language: '', name: '' 
    },
    
    errors: {},
    
    games: [ { 
      boardSize: 0, handicap: 0, id: 0, komi: 0.0, open: false, 
      playerBlack: '', playerBlackRank: '', playerWhite: '',
      playerWhiteRank: '', winType: null
    } ],
    
    joinGame: {},
    
    messages: [ { 
      admin: false, content: '', username: ''
    } ],
    
    socket: {
      connected: false,
      nsp: ''
    },
    
    user: { username: '', email: '', id: 0 }
  };
}