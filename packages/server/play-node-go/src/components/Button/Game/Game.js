import React from 'react';
import { Link } from 'react-router-dom';
import './Game.scss';

const GameButton = (props) => {
  const gameData = props.game;
  return (
    <div className="GameButton" data-testid="GameButton">
      <Link to={`/games/${gameData.id}`}>View Game</Link>
      <p>{gameData.playerBlack} - {gameData.playerBlackRank}</p>
      <p>{gameData.playerWhite} - {gameData.playerWhiteRank}</p>
    </div>
  );
}

export default GameButton;