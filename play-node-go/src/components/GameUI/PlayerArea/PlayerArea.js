import React from 'react';
import './PlayerArea.scss';

const PlayerArea = (props) => {
  // const { user } = props
  const user = {
    stones: 'black',
    username: 'Name',
    captures: 0
  }

  return (
    <div
      className={`player-container player-container--${user.stones}`}
    >
      <div 
        className={`player-container__bowl player-container__bowl--${user.stones}`}
      >
        <p>Pass?</p>
      </div>
      <div
        className={`player-container__name-space player-container__name-space--${user.stones}`}
      >
        <h4>{user ? user.username : 'Waiting for player' }</h4>

        <div
          className={`player-container__caps-space player-container__caps-space__${user.stones}`}
        >
          <p
            className={`player-container__resign-message player-container__resign-message--${user.stones}`}
          >Resign?</p>

          <p 
            className={`player-container__caps-counter player-container__caps-counter--${user.stones}`}
          >{user ? user.captures : 'Captures go here'}</p>

        </div>

      </div>

    </div>
  );
}

export default PlayerArea;