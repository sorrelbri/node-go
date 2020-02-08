import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import gamesServices from '../../services/api/gamesServices';
import './Game.scss';
import Logo from '../../components/Display/Logo/Logo';
import Board from '../../components/GameUI/Board/Board';
import PlayerArea from '../../components/GameUI/PlayerArea/PlayerArea';

const Game = (props) => {
  const { state, dispatch } = props;
  const gameId = parseInt(useParams().id) || 0;

  
  useEffect(() => {
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
    fetchGameAPI();
  }, [ gameId, dispatch ])

  
  useEffect(() => {
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
    roomSocketConnect();
  }, [ state.active , dispatch, state.user ] )

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
        <PlayerArea />
        <Board 
          dispatch={dispatch}
          game={state.active.game} 
          record={state.active.record}
          user={state.user}
          board={state.board}
        />
        <PlayerArea />
      </div>

      <div className="Game__message-container">
        <p>Messages</p>
        <p>Message Form</p>
      </div>
    </div>
  );
}

export default Game;