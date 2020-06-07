import React from "react";
import "./PlayerArea.scss";

const PlayerArea = ({ handleResignClick, playerMeta, turn }) => {
  const { stones, player, rank, captures } = playerMeta;
  const isTurn =
    (stones === "black" && turn === 1) || (stones === "white" && turn === -1);

  return (
    <div className={`player-container player-container--${stones}`}>
      <div
        className={`player-container__bowl player-container__bowl--${stones}`}
        {...(isTurn ? { "data-turn": true } : null)}
      >
        <p>Pass?</p>
      </div>
      <div
        className={`player-container__name-space player-container__name-space--${stones}`}
      >
        <h4>
          {playerMeta
            ? `${player || stones} ${rank || "?"}`
            : "Waiting for player"}
        </h4>

        <div
          className={`player-container__caps-space player-container__caps-space__${stones}`}
        >
          <p
            className={`player-container__resign-message player-container__resign-message--${stones}`}
            {...(isTurn ? { onClick: () => handleResignClick(stones) } : null)}
          >
            Resign?
          </p>

          <p
            className={`player-container__caps-counter player-container__caps-counter--${stones}`}
          >
            {playerMeta ? captures : "Captures go here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerArea;
