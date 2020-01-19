import React, { useEffect } from 'react';
import './Home.scss';
import roomsServices from '../../services/api/roomsServices';

const Home = props => {

  const fetchRoomsAPI = async () => {
    const response = await roomsServices.indexService();
    if (response) {
      const action = {
        type: 'ROOMS',
        message: 'SET_ROOMS',
        body: response
      }
      return props.dispatch(action)
    }
  }

  useEffect(() => {
    fetchRoomsAPI();
  }, [])

  return (  
    <div className="page">

      <div className="Home" data-testid="Home">
        <p>Home</p>
      </div>
    </div>
  );
}

export default Home;