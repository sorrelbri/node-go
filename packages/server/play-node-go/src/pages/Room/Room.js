import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Room.scss';
import socketIOClient from 'socket.io-client';
import config from '../../config';
import roomsServices from '../../services/api/roomsServices';

const Room = (props) => {
  const roomId = parseInt(useParams().id) || 0;
  const [ socketData, setSocketData ] = useState();
  const [ messages, setMessages ] = useState();

  const fetchRoomAPI = async () => {
    const response = await roomsServices.getRoomService(roomId);
    if (response) {
      console.log(response);
      // const action = {
      //   type: 'ROOMS',
      //   message: 'JOIN_ROOM',
      //   body: response
      // }
      // return dispatch(action);
    }
  }
  
  useEffect(() => {
    fetchRoomAPI();
  }, [])

  // ! [start] roomSocket
  const roomSocket = socketIOClient(`${config.socketAddress}/${roomId}`)

  const roomSocketConnect = () => {
    roomSocket.emit('connect');
    // ! dispatch data
    roomSocket.on('connected', data => setSocketData('room socket connected'));
    roomSocket.on('connect_error', err => console.log(err));
    roomSocket.on('error', err => console.log(err));
  }

  useEffect(() => {
    roomSocketConnect();
  }, [])

  // ! [end]

  return (  
    <div className="Room" data-testid="Room">
      <h2></h2>
    </div>
  );
}

export default Room;