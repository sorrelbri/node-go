import React from 'react';
import './Board.scss';
import Point from '../Point/Point';

const Board = (props) => {
  const { game, record, user, dispatch } = props;

  const renderPoints = boardSize => {
    let i = 0, boardPoints = [];
    while (i < boardSize * boardSize) {
      const posX = Math.floor(i/boardSize) + 1;
      const posY = i % boardSize + 1;
      boardPoints.push(
        <Point 
          key={`${posX}-${posY}`} 
          posX
          posY
          {...props}
        />
      ); i++;
    }
    return boardPoints;
  }

  return (  
    <div className="Game__board">
      { game.id ? renderPoints(game.boardSize) : <></> }
    </div>
  );
}

export default Board;