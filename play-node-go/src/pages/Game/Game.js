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

  const fetchGameAPI = async () => {
    const response = await gamesServices.getGameService(gameId);
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

  const roomSocketConnect = () => {
    const game = state.active.game;
    const user = state.user;
    const action = {
      type: 'SOCKET',
      message: 'CONNECT_GAME',
      body: { game, user, dispatch }
    }
    return dispatch(action);
  }

  useEffect(() => {
    roomSocketConnect();
  }, [state.active] )

  // ! [end]

  return (  
    <div 
      className="Game" 
      data-testid="Game"
    >
      <p>Game</p>
      
      <span 
        className="Game__socket-flag"
      >{state.socket ? '✓' : ' ⃠'}</span>
      
      <Development />
    
    </div>
  );
}

export default Game;