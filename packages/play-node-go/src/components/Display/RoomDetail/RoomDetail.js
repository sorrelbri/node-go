import React from 'react';
import './RoomDetail.scss';

const RoomDetail = ({room}) => {
  return (
    <div className="RoomDetail">
      <div className="RoomDetail__arrow"></div>
      <div className="RoomDetail__data">
        <div className="RoomDetail__heading">
          <h3 className="RoomDetail__room-name">{room.name}</h3>
          <div className="RoomDetail__room-lang"></div>
          <p className="RoomDetail__room-description">{room.description}</p>
        </div>
        <div className="RoomDetail__current">
          <h4 className="RoomDetail__current-header">Current:</h4>
          <p className="RoomDetail__current-players"></p>
          <p className="RoomDetail__current-games"></p>
          <p className="RoomDetail__current-rank"></p>
        </div>
      </div>
    </div>
  );
}
 
export default RoomDetail;