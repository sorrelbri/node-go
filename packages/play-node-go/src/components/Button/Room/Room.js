import React from 'react';
import { Link } from 'react-router-dom';
import RoomDetail from '../../Display/RoomDetail/RoomDetail';
import './Room.scss';

const RoomButton = ({room, roomDetail, showRoomDetail}) => {
  const smallRoom = (
    <div className="small-room">
      <div className="small-room__roof">
        <div className="small-room__roof-top small-room__roof-top--left"></div>
        <div className="small-room__roof--left"></div>
        <div className="small-room__roof-top small-room__roof-top--right"></div>
        <div className="small-room__roof--right"></div>
      </div>
      <div className="small-room__body">
        <div className="small-room__trim small-room__trim--left"></div>
        <div className="small-room__sign">
          <div className="small-room__sign__stone small-room__sign__stone--black"></div>
          <div className="small-room__sign__stone small-room__sign__stone--white"></div>
          <div className="small-room__sign__stone small-room__sign__stone--white"></div>
          <div className="small-room__sign__stone small-room__sign__stone--black"></div>
        </div>
        <div className="small-room__window small-room__window--left">
          <div className="small-room__window-frame small-room__window-frame--top"></div>
          <div className="small-room__window-frame small-room__window-frame--left"></div>
          <div className="small-room__window-frame small-room__window-frame--middle"></div>
          <div className="small-room__window-frame small-room__window-frame--center"></div>
          <div className="small-room__window-frame small-room__window-frame--right"></div>
          <div className="small-room__window-frame small-room__window-frame--bottom"></div>
        </div>
        <div className="small-room__door">
          <div className="small-room__door-frame small-room__door-frame--top"></div>
          <div className="small-room__door-frame small-room__door-frame--left"></div>
          <div className="small-room__door-handle"></div>
          <div className="small-room__door-frame small-room__door-frame--right"></div>
        </div>
        <div className="small-room__window small-room__window--right">
          <div className="small-room__window-frame small-room__window-frame--top"></div>
          <div className="small-room__window-frame small-room__window-frame--left"></div>
          <div className="small-room__window-frame small-room__window-frame--middle"></div>
          <div className="small-room__window-frame small-room__window-frame--center"></div>
          <div className="small-room__window-frame small-room__window-frame--right"></div>
          <div className="small-room__window-frame small-room__window-frame--bottom"></div>
        </div>
        <div className="small-room__trim small-room__trim--bottom-left"></div>
        <div className="small-room__trim small-room__trim--right"></div>
        <div className="small-room__trim small-room__trim--bottom-right"></div>
      </div>
    </div>  
  )

  return (
    <>
      <div className="RoomButton" data-testid="RoomButton">
        <h4 className="RoomButton__room-link RoomButton__room-link--action">
          <Link to={`/rooms/${room.id}`}>Join {room.name}</Link>
        </h4>
        <h4 
          className="RoomButton__room-link RoomButton__room-link--info"
          onClick={e => showRoomDetail(room.id)}
        >
          ?
        </h4>
        {smallRoom}
      </div>
      {roomDetail ? <RoomDetail room={room} /> : <></>}
    </>
  );
}

export default RoomButton;