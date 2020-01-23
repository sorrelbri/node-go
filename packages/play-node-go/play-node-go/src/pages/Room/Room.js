import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Room.scss';
import socketIOClient from 'socket.io-client';
import config from '../../config';
import roomsServices from '../../services/api/roomsServices';
import GameButton from '../../components/Button/Game/Game';
import Message from '../../components/Display/Message/Message';

import Development from '../../components/Display/Development/Development';

const Room = (props) => {
  const state = props.state;
  const dispatch = props.dispatch;
  const roomId = parseInt(useParams().id) || 0;
  const [ socketData, setSocketData ] = useState();
  const [ messages, setMessages ] = useState();

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
  const roomSocket = socketIOClient(`${config.socketAddress}/${roomId}`)

  const roomSocketConnect = () => {
    roomSocket.emit('connect');
    // ! dispatch data
    roomSocket.on('connected', data => setSocketData('room socket connected'));
    roomSocket.on('connect_error', err => console.log(err));
    roomSocket.on('error', err => console.log(err));
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
        />
      ))
    }
    return <p>Loading Games...</p>
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
    return <p>Loading Messages...</p>
  }


  return (  
    <div className="Room" data-testid="Room">
      <h2>{state.currentRoom ? state.currentRoom.name : 'Loading'}</h2>

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