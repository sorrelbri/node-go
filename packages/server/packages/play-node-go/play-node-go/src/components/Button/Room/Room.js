import React from 'react';
import './Room.scss';

const RoomButton = (props) => {
  const roomData = props.room;
  return (
    <div className="RoomButton" data-testid="RoomButton">
      <h4 className="RoomButton__room-name">{roomData.name}</h4>
    </div>
  );
}

export default RoomButton;