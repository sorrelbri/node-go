import React from 'react';
import { Link } from 'react-router-dom';
import './Room.scss';

const RoomButton = (props) => {
  const roomData = props.room;
  return (
    <div className="RoomButton" data-testid="RoomButton">
      <h4 className="RoomButton__room-name">{roomData.name}</h4>
      <Link to={`/rooms/${roomData.id}`}>Join Room</Link>
    </div>
  );
}

export default RoomButton;