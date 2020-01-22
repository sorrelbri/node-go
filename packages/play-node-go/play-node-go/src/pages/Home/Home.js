import React, { useEffect } from 'react';
import './Home.scss';
import roomsServices from '../../services/api/roomsServices';
import RoomButton from '../../components/Button/Room/Room';


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
    return <p>Loading Component</p>
  }

  const fetchRoomsAPI = async () => {
    const response = await roomsServices.indexService();
    if (response) {
      const action = {
        type: 'ROOMS',
        message: 'SET_ROOMS',
        body: response
      }
      return dispatch(action)
    }
  }
  
  useEffect(() => {
    fetchRoomsAPI();
  }, [])

  return (  
    <div className="page">

      <div className="Home" data-testid="Home">
        {renderRooms()}
      </div>
    </div>
  );
}

export default Home;