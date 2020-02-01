import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import config from '../../config';
import gamesServices from '../../services/api/gamesServices';
import './Game.scss';
import Logo from '../../components/Display/Logo/Logo';
import Board from '../../components/GameUI/Board/Board';

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
  return (  
    <div 
      className="Game" 
      data-testid="Game"
    >
      <div className="Game__meta-container">
        <span 
          className="Game__socket-flag"
        >{state.socket ? '✓' : ' ⃠'}</span>
        <Logo />
        <p>Timer</p>
        <p>? Game Tree</p>
      </div>

      <div className="Game__board-container">
        <p>Player Area</p>
        <ul><li>Bowl</li><li>? Kifu</li><li>Captures</li></ul>
        <Board 
          dispatch={dispatch}
          game={state.active.game} 
          record={state.active.record}
          user={state.user}
          board={state.board}
        />
        <p>Player Area</p>
        <ul><li>Captures</li><li>? Kifu</li><li>Bowl</li></ul>
      </div>

      <div className="Game__message-container">
        <p>Messages</p>
        <p>Message Form</p>
      </div>
    </div>
  );
}

export default Game;