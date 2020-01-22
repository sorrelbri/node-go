import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Room.scss';
import socketIOClient from 'socket.io-client';
import config from '../../config';

const Room = (props) => {
  const roomId = useParams().id;
  const [ socketData, setSocketData ] = useState();
  const [ messages, setMessages ] = useState();
  
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