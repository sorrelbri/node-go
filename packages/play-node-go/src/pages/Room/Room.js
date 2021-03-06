import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Room.scss';
import roomsServices from '../../services/api/roomsServices';
import GameButton from '../../components/Button/Game/Game';
import Message from '../../components/Display/Message/Message';
import ActionError from '../../components/Error/ActionError/ActionError';

import Development from '../../components/Display/Development/Development';
import Loading from '../../components/Display/Loading/Loading';

const Room = (props) => {
  const { state, dispatch } = props;
  const roomId = parseInt(useParams().id) || 0;

  
  useEffect(() => {
    const fetchRoomAPI = async () => {
      const response = await roomsServices.getRoomService(roomId);
      if (response) {
        const action = {
          type: 'ROOMS',
          message: 'JOIN_ROOM',
          body: response
        }
        return dispatch(action);
      }
    }
    fetchRoomAPI();
  }, [ roomId, dispatch ])

  useEffect(() => {
    const roomSocketConnect = () => {
      const action = {
        type: 'SOCKET',
        message: 'CONNECT_ROOM',
        body: {user: state.user, room: roomId, dispatch}
      }
      dispatch(action)
    }
    roomSocketConnect();
  }, [ roomId, state.user, dispatch ])

  const renderGames = () => {
    const games = state.games || [];
    if (games.length) {
      return games.map(gameData => (
        <GameButton 
          key={`game-${gameData.id}`}
          game={gameData}
          dispatch={dispatch}
          user={gameData.playerBlack === state.user.username || gameData.playerWhite === state.user.username}
        />
      ))
    }
    return <Loading />
  }

  const renderMessages = () => {
    const messages = state.messages || [];
    if (messages.length) {
      return messages.map((messageData, idx) => (
        <Message
          key={`message-${idx}`}
          message={messageData}
        />
      ))
    }
    return <Loading />
  }


  return (  
    <div className="Room" data-testid="Room">
    
      <div className="Room__heading">
        {state.errors.joinGame ? <ActionError error={state.errors.joinGame}/> : <></>}
      </div>

      <div className="Room__game-container">
        {renderGames()}
      </div>

      <div className="Room__message-container">
        {renderMessages()}
        <Development />
      </div>

    </div>
  );
}

export default Room;