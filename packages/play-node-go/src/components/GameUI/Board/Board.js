import React from 'react';
import './Board.scss';
import Point from '../Point/Point';

const Board = (props) => {
  const { game, user, dispatch, board, meta } = props;
  const sizeFlag = `Game__board--size-${ game.boardSize }`

  const renderPoints = boardSize => {
    let i = 0, boardPoints = [];
    while (i < boardSize * boardSize) {
      const posX = Math.floor(i/boardSize) + 1;
      const posY = i % boardSize + 1;
      console.log(board[`${posX}-${posY}`])
      boardPoints.push(
        <Point 
          key={`${posX}-${posY}`} 
          posX={posX}
          posY={posY}
          pointData={board[`${posX}-${posY}`]}
          // point={board[posX][posY]}
          dispatch={dispatch}
          user={user}
          meta={meta}
          {...props}
        />
      ); i++;
    }
    return boardPoints;
  }

  return (  
    <div className={`Game__board ${sizeFlag}`}>
      { game.id ? renderPoints(game.boardSize) : <></> }
    </div>
  );
}

export default Board;