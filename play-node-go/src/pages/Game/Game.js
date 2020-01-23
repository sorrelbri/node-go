import React from 'react';
import './Game.scss';

import Development from '../../components/Display/Development/Development';

const Game = () => {
  return (  
    <div className="Game" data-testid="Game">
      <p>Game</p>
      <Development />
    </div>
  );
}

export default Game;