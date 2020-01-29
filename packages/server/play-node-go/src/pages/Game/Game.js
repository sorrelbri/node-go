import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import config from '../../config';
import gamesServices from '../../services/api/gamesServices';
import './Game.scss';

import Development from '../../components/Display/Development/Development';

const Game = (props) => {
  const { state, dispatch } = props;
  const gameId = parseInt(useParams().id) || 0;
  const [ socket, setSocket ] = useState(false)

  const fetchGameAPI = async () => {
    console.log(gameId)
    const response = await gamesServices.getGameService(gameId);
    console.log(response)
    if (response) {
      const action = {
        type: 'GAMES',
        message: 'SET_ACTIVE',
        body: response
      }
      return dispatch(action);
    }
  }
  
  useEffect(() => {
    fetchGameAPI();
  }, [])

  // ! [start] gameSocket

  const roomSocketConnect = (roomSocket) => {
    roomSocket.on('connect', socket => {
      roomSocket.emit('joined game', gameId)
      roomSocket.on('success', () => setSocket(true))
    });
    roomSocket.on('connect_error', err => {
      setSocket(false)
      console.log(err);
    });
    roomSocket.on('error', err => {
      setSocket(false)
      console.log(err);
    });
  }

  useEffect(() => {
    if (!state.active) return;
    const roomSocket = socketIOClient(`${config.socketAddress}/${state.active.game.room}`)
    roomSocketConnect(roomSocket);
  }, [state.active])

  useEffect(() => {
    const data = {
      user: state.user,
      game: state.joinGame
    };
    console.log('emitting request')
    console.log(data)
    // socket.emit('join_game_request', data)
  }, [state.joinGame])

  // ! [end]

  return (  
    <div 
      className="Game" 
      data-testid="Game"
    >
      <p>Game</p>
      
      <span 
        className="Game__socket-flag"
      >{socket ? '✓' : ' ⃠'}</span>
      
      <Development />
    
    </div>
  );
}

export default Game;