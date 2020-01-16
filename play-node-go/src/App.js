import React, {useState, useEffect, useReducer} from 'react';
import './App.scss';
import config from './config';

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import socketIOClient from 'socket.io-client';

import Sidebar from './components/Sidebar/Sidebar';

import Account from './pages/Account/Account';
import Game from './pages/Game/Game';
import Home from './pages/Home/Home';
import News from './pages/News/News';
import Room from './pages/Room/Room';

import { stateReducer } from './reducers/stateReducer';
import { initState } from './reducers/init/stateReducer.init';

export const socket = socketIOClient(config.apiAddress);


function App() {
  const [fetchData, setFetchData] = useState();
  const [socketData, setSocketData] = useState();
  const [error, setError] = useState([]);

  const [ state, dispatch ] = useReducer(
    stateReducer,
    {},
    initState
  );

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
            <Sidebar page="account" state={state} dispatch={dispatch}/>
            <Account state={state} dispatch={dispatch}/>
          </Route>

          <Route path="/rooms">
            <Sidebar page="rooms"/>
            <Room state={state} dispatch={dispatch}/>
          </Route>

          <Route path="/games">
            <Sidebar page="games"/>
            <Game state={state} dispatch={dispatch}/>
          </Route>
        
          <Route path="/news">
            <Sidebar page="news"/>
            <News state={state} dispatch={dispatch}/>
          </Route>
        
          <Route path="/">
            <Sidebar page="home" state={state} dispatch={dispatch}/>
            {/* Add ternary for login */}
            <Home state={state} dispatch={dispatch}/>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
