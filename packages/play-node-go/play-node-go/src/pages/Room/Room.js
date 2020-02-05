import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Room.scss';
import socketIOClient from 'socket.io-client';
import config from '../../config';
import roomsServices from '../../services/api/roomsServices';
import GameButton from '../../components/Button/Game/Game';
import Message from '../../components/Display/Message/Message';
import ActionError from '../../components/Error/ActionError/ActionError';

import Development from '../../components/Display/Development/Development';
import Loading from '../../components/Display/Loading/Loading';

const Room = (props) => {
  const { state, dispatch } = props;
  const roomId = parseInt(useParams().id) || 0;

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
  
  useEffect(() => {
    fetchRoomAPI();
  }, [])

  // ! [start] roomSocket

  const roomSocketConnect = () => {
    const action = {
      type: 'SOCKET',
      message: 'CONNECT_ROOM',
      body: {user: state.user, room: roomId, dispatch}
    }
    dispatch(action)
  }

  useEffect(() => {
    roomSocketConnect();
  }, [])

  // ! [end]

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
        <h2 className="heading--two">{state.currentRoom ? state.currentRoom.name : 'Loading'}</h2>
        {/* <span className="Room__connection">{socket ? '✓' : ' ⃠'}</span> */}
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