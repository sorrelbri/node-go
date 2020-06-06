import React from "react";
import "./PlayerArea.scss";

const PlayerArea = ({ playerMeta }) => {
  // const { user } = props
  const user = {
    stones: "black",
    username: "Name",
    captures: 0,
  };

  return (
    <div className={`player-container player-container--${playerMeta.stones}`}>
      <div
        className={`player-container__bowl player-container__bowl--${playerMeta.stones}`}
      >
        <p>Pass?</p>
      </div>
      <div
        className={`player-container__name-space player-container__name-space--${playerMeta.stones}`}
      >
        <h4>
          {playerMeta
            ? `${playerMeta.player} ${playerMeta.rank}`
            : "Waiting for player"}
        </h4>

        <div
          className={`player-container__caps-space player-container__caps-space__${playerMeta.stones}`}
        >
          <p
            className={`player-container__resign-message player-container__resign-message--${playerMeta.stones}`}
          >
            Resign?
          </p>

          <p
            className={`player-container__caps-counter player-container__caps-counter--${playerMeta.stones}`}
          >
            {playerMeta ? playerMeta.captures : "Captures go here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerArea;
