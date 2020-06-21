import React from "react";
import "./Board.scss";
import Point from "../Point/Point";

const Board = (props) => {
  const { game, user, dispatch, board, meta } = props;
  const sizeFlag = `Game__board--size-${game.boardSize}`;
  const hoshiPoints = {
    9: { "3-3": true, "7-7": true, "3-7": true, "7-3": true },
    13: {
      "7-7": true,
      "10-7": true,
      "7-4": true,
      "7-10": true,
      "4-7": true,
      "4-4": true,
      "10-10": true,
      "4-10": true,
      "10-4": true,
    },
    19: {
      "10-10": true,
      "16-10": true,
      "10-4": true,
      "10-16": true,
      "4-10": true,
      "4-4": true,
      "16-16": true,
      "4-16": true,
      "16-4": true,
    },
  };

  const isHoshi = (posX, posY) =>
    hoshiPoints[game.boardSize][`${posX}-${posY}`];

  const renderPoints = (boardSize) => {
    let i = 0,
      boardPoints = [];
    while (i < boardSize * boardSize) {
      const posX = Math.floor(i / boardSize) + 1;
      const posY = (i % boardSize) + 1;
      const pointData = board[`${posX}-${posY}`];
      const dotData =
        meta && meta.turn === 0 && !meta.winner
          ? meta?.territory[`${posX}-${posY}`]
          : game.turn || meta?.turn;
      boardPoints.push(
        <Point
          key={`${posX}-${posY}`}
          posX={posX}
          posY={posY}
          pointData={pointData}
          dotData={dotData}
          dispatch={dispatch}
          user={user}
          meta={meta}
          hoshi={isHoshi(posX, posY)}
          {...props}
        />
      );
      i++;
    }
    return boardPoints;
  };

  return (
    <div className={`Game__board ${sizeFlag}`}>
      {game.id ? renderPoints(game.boardSize) : <></>}
    </div>
  );
};

export default Board;
