import React, { useEffect, useReducer } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import MainWrapper from './pages/Layout/MainWrapper/MainWrapper';
import { stateReducer } from './reducers/reducer';
import { initState } from './reducers/init/reducer.init';
import indexServices from './services/api/indexServices';
import './App.scss';


function App() {
  const [ state, dispatch ] = useReducer(
    stateReducer,
    {},
    initState
  );
  
  useEffect(() => {
    const fetchIndexAPI = async () => {
      const response = await indexServices.indexService();
      if (response) {
        const action = {
          type: 'INDEX',
          message: 'SET_USER',
          body: response
        }
        dispatch(action)
      }
    }
    fetchIndexAPI();
  }, [ ])

  
  useEffect(() => {
    const socketConnect = () => {
      if (state.connect.type) return;
      dispatch({type:'SOCKET', message: 'LAUNCH', body:{nsp:'', dispatch}});
    }
    socketConnect();
  }, [ state.connect ])

  return (
    <Router>
      
      <div data-testid="App" className="App">
        <Switch>

          <Route path="/account">
            <MainWrapper page="account" state={state} dispatch={dispatch}/>
          </Route>

          <Route path="/rooms/:id">
            <MainWrapper page="room" state={state} dispatch={dispatch}/>
          </Route>

          <Route path="/games/:id">
            <MainWrapper page="game" state={state} dispatch={dispatch}/>
          </Route>
        
          <Route path="/news">
            <MainWrapper page="news" state={state} dispatch={dispatch}/>
          </Route>

          <Route path="/home">
            <MainWrapper page="home" state={state} dispatch={dispatch}/>
          </Route>
        
          <Route path="/">
            {state.user.username 
            ? <MainWrapper page="home" state={state} dispatch={dispatch}/> 
            : <MainWrapper page="news" state={state} dispatch={dispatch}/>}
          </Route>

        </Switch>
        <p className="App__socket-flag">{state.connect.type ? '✓' : ' ⃠'}</p>
      </div>
    </Router>
  );
}

export default App;
