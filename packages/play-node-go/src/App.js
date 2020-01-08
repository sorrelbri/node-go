import React, {useState} from 'react';
import './App.scss';
import config from './config';

import { Switch, Route } from 'react-router-dom';

import socketIOClient from 'socket.io-client';
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

        <Route path="/" exact>
          <p>Index</p>
        </Route>

        <Route path="/game">
          <p>Game</p>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
