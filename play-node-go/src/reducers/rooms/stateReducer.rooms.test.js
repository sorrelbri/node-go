import {stateReducer} from '../stateReducer';
import { initState } from '../init/stateReducer.init';

const roomsData = [
  {
    description: "A general place to play Go",
    id: 1,
    language: "EN",
    name: "main"
  }
]

const joinRoomData = {
  currentRoom: {
    id:1, name:"main", 
    description:"A general place to play Go", language:"EN"
  },
  roomGames: [
    { 
      komi:6.5, handicap:0, board_size:19,
      player_black:"anon", player_white:"anon",
      player_black_rank:"K3", player_white_rank:"K2"
    }
  ],
  messages: [
    {
      content: "Hey! Welcome to the general room!", username: "userOne", admin: true
    }
  ]
}

it('default returns state unaltered', () => {
  const state = initState();
  const action = {type: 'ROOMS', message: '', body: JSON.stringify(roomsData)};
  expect(stateReducer(state, action)).toEqual(state);
})

it('set rooms returns state with rooms added', () => {
  const state = initState();
  const action = {type: 'ROOMS', message: 'SET_ROOMS', body: roomsData};
  expect(stateReducer(state, action)).toEqual({...state, rooms: roomsData});
});

it('join room returns state with current room, games and messages all populated', () => {
  const state = initState();
  const action = {type: 'ROOMS', message: 'JOIN_ROOM', body: joinRoomData};
  expect(stateReducer(state, action)).toEqual({
    ...state, 
    currentRoom: joinRoomData.currentRoom, 
    messages: joinRoomData.messages,
    games: joinRoomData.roomGames
  })
});