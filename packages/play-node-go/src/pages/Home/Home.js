import React, { useEffect } from 'react';
import './Home.scss';
import roomsServices from '../../services/api/roomsServices';
import RoomButton from '../../components/Button/Room/Room';

import Loading from '../../components/Display/Loading/Loading';

const Home = props => {
  const state =     props.state || {};
  const dispatch =  props.dispatch;
  
  const renderRooms = () => {
    const rooms = state.rooms || [];
    if (rooms.length) {
      return rooms.map(roomData => (
        <RoomButton 
          key={`room-${roomData.id}`}
          room={roomData}
        />
      ))
    }
    // TODO stub loader
    return <Loading />
  }

  
  useEffect(() => {
    const fetchRoomsAPI = async () => {
      const response = await roomsServices.indexService();
      if (response) {
        const action = {
          type: 'ROOMS',
          message: 'SET_ROOMS',
          body: response.rooms
        }
        return dispatch(action)
      }
    }
    fetchRoomsAPI();
  }, [ dispatch ])

  return (  
    <div className="Home" data-testid="Home">
      {renderRooms()}
    </div>
  );
}

export default Home;