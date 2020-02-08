import { stateReducer } from '../reducer';

export const roomsReducer = (state, action) => {
  switch(action.message) {

    case 'SET_ROOMS':
      const rooms = action.body;
      return {...state, rooms};

    case 'SET_CURRENT':
      const currentRoom = action.body;
      return {...state, currentRoom};

    case 'JOIN_ROOM': {
      const stateWithRoom = setCurrentRoom(state, action);
      const stateWithMessages = setMessages(stateWithRoom, action);
      if (!action.body.roomGames) {
        return setJoinRoomError(state);
      }
      const stateWithGames = setGames(stateWithMessages, action);

      return stateWithGames;
    }

    case 'NEW_USER': {
      if (!action.data) {
        return state;
      }
      return state;
    }
      
    default:
      return state;
  }
}

function setMessages(state, action) {
  if(action.body.messages.length) {
    const messages = action.body.messages;
    const messageAction = {
      type: 'MESSAGES',
      message: 'SET_MESSAGES',
      body: messages
    }
    return stateReducer(state, messageAction);
  }
  return state;
}

function setJoinRoomError(state, body) {
  const errorAction = {
    type: 'ERR',
    message: 'JOIN_ROOM_ERROR',
    body: { joinRoomError: 'Game room has no games' }
  }
  return stateReducer(state, errorAction);
}

function setCurrentRoom(state, action) {
  const currentRoom = action.body.currentRoom;
  const roomAction = {
    type: 'ROOMS',
    message: 'SET_CURRENT',
    body: currentRoom
  }
  return stateReducer(state, roomAction);
}

function setGames(state, action) {
  if (action.body.roomGames.length) {
    const games = action.body.roomGames;
    const gamesAction = {
      type: 'GAMES',
      message: 'SET_GAMES',
      body: games
    }
    return stateReducer(state, gamesAction);
  }
  return state;
}