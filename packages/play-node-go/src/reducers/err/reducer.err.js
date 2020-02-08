export const errorReducer = (state, action) => {
  switch (action.message) {
    case 'AUTH_ERROR':
      return authErrorReducer(state, action);

    case 'JOIN_ROOM_ERROR':
      return joinRoomErrorReducer(state, action);
    
      case 'JOIN_GAME_ERROR':
      return joinGameErrorReducer(state, action);

    default:
      return state;
  } 
}

function authErrorReducer(state, action) {
  const auth = action.body.authError;
  return {...state, errors: {auth} };
}

function joinRoomErrorReducer(state, action) {
  const joinRoom = action.body.joinRoomError;
  return { ...state, errors: {joinRoom} }
}

function joinGameErrorReducer(state, action) {
  const joinGame = action.body.joinGameError;
  return { ...state, errors: {joinGame} }
}