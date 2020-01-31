import React from 'react';
import './Point.scss';

const Point = (props) => {
  const { posX, posY, user, game, record, dispatch } = props;
  const xFlag = () => {
    if ( posX === 1 ) return `board__point--top`
    if ( posX === game.boardSize ) return `board__point--bottom`
    return '';
  }
  const yFlag = () => {
    if ( posY === 1 ) return `board__point--left`
    if ( posY === game.boardSize ) return `board__point--right`
    return '';
  }

  return (
    <div 
      className={`board__point ${xFlag()} ${yFlag()}`}
      onClick={() => dispatch({type: 'SOCKET', message: 'MAKE_MOVE', body: {user: {}, game: {}, room: {}, board: {}, move: {}}})}
    >

    </div>
  );
}

export default Point;