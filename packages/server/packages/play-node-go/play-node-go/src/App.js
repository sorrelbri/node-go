import React, {useState, useEffect, useReducer} from 'react';
import './App.scss';
import config from './config';

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import socketIOClient from 'socket.io-client';

import Account from './pages/Account/Account';
import Game from './pages/Game/Game';
import Home from './pages/Home/Home';
import News from './pages/News/News';
import Room from './pages/Room/Room';

export const socket = socketIOClient(config.apiAddress);

function App() {
  const [fetchData, setFetchData] = useState();
  const [socketData, setSocketData] = useState();
  const [error, setError] = useState([]);

  useEffect(() => {
    fetch(config.apiAddress)
    .then(res => res.text())
    .catch(err => setError([...error, err]))
    .then(data => setFetchData(data))
  })
  useEffect(() => {
    
    socket.emit('connect');
    socket.on('connect', data => setSocketData('socket connected'));
    socket.on('connect_error', err => setError([...error, err]));
    socket.on('error', err => setError([...error, err]))
  })
  
  return (
    <Router>
      
      <div data-testid="App" className="App">
        <h1>React Boilerplate</h1>
        {fetchData ? <p>{fetchData}</p> : <></>}
        {socketData ? <p>{socketData}</p> : <></>}
        {error ? error.map(err => <p>{err}</p>): <></>}
        <Switch>

          <Route path="/account">
            <Account />
          </Route>

          <Route path="/rooms">
            <Room />
          </Route>

          <Route path="/games">
            <Game />
          </Route>
        
          <Route path="/news">
            <News />
          </Route>
        
          <Route path="/">
            {/* Add ternary for login */}
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
