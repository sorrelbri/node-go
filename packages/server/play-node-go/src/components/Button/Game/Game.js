import React from 'react';
import { Link } from 'react-router-dom';
import './Game.scss';

const GameButton = (props) => {
  const { game, dispatch } = props;

  const requestJoinGame = () => {
    console.log(`request to Join Game ${game.id}!`)
    const requestAction = {
      type: 'GAMES',
      message: 'JOIN_REQUEST',
      body: {id: game.id}
    }
    dispatch(requestAction);
  }

  const renderOpenGame = () => {
    return (
      <>
        <a onClick={() => requestJoinGame()} >Request to Join Game</a>

        <div className="Game__playerData">
          <span className="Game__playerData__name">{game.playerBlack}</span>
          <span className="Game__playerData__rank">{game.playerBlackRank}</span>
        </div>
      </>
    )
  }

  const renderInProgressGame = () => {
    const gameLinkText = game.winType ? 'Study Game' : 'Watch Game'
    return (
      <>
        <Link to={`/games/${game.id}`}>{gameLinkText}</Link>
        
        <div className="Game__playerData">
          <span className="Game__playerData__name">{game.playerBlack}</span>
          <span className="Game__playerData__rank">{game.playerBlackRank}</span>
        </div>

        <div className="Game__playerData">
          <span className="Game__playerData__name">{game.playerWhite}</span>
          <span className="Game__playerData__rank">{game.playerWhiteRank}</span>
        </div>
      </>
    )
  }

  return (
    <div className="GameButton" data-testid="GameButton">
      {game.open ? renderOpenGame() : renderInProgressGame()}
    </div>
  );
}

export default GameButton;