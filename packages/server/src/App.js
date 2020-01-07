import React from 'react';
import './App.scss';
import config from './config';

function App() {
  let fetchData = {};
  fetch(config.apiAddress).then(res => {console.log(res);fetchData = res.body}).then(() => console.log(fetchData))
  return (
    <div className="App">
      <h1>React Boilerplate</h1>
      {fetchData ? <p></p> : <></>}
    </div>
  );
}

export default App;
