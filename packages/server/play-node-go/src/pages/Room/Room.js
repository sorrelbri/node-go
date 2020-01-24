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

const Room = (props) => {
  const state = props.state;
  const dispatch = props.dispatch;
  const roomId = parseInt(useParams().id) || 0;
  const [ socket, setSocket ] = useState(false);

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
    roomSocket.on('connect', socket => {
      setSocket(true)
    });
    roomSocket.on('join_game_request', data => {
      // !
      console.log(data)
    })
    roomSocket.on('connect_error', err => {
      setSocket(false)
      // !
      console.log(err);
    });
    roomSocket.on('error', err => {
      setSocket(false)
      // !
      console.log(err);
    });
  }

  useEffect(() => {
    roomSocketConnect();
  }, [])

  useEffect(() => {
    const data = {
      user: state.user,
      game: state.joinGame
    };
    console.log('emitting request')
    console.log(data)
    roomSocket.emit('join_game_request', data)
  }, [state.joinGame])

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
      <div className="Room__heading">
        <h2>{state.currentRoom ? state.currentRoom.name : 'Loading'}</h2>
        <span className="Room__connection">{socket ? '✓' : ' ⃠'}</span>
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