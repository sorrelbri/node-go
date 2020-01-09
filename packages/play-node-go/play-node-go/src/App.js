import React, {useState} from 'react';
import './App.scss';
import config from './config';

import { Switch, Route } from 'react-router-dom';

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
  fetch(config.apiAddress).then(res => res.text()).then(data => setFetchData(data));
  socket.emit('connect');
  socket.on('connected', data => setSocketData(data.message));
  return (
    <div className="App">
      <h1>React Boilerplate</h1>
      {fetchData ? <p>{fetchData}</p> : <></>}
      {socketData ? <p>{socketData}</p> : <></>}
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
  );
}

export default App;
