import React, { useState } from 'react';
import './MainWrapper.scss';

import NavBar from '../NavBar/NavBar';
import Sidebar from '../Sidebar/Sidebar';
import Account from '../../pages/Account/Account';
import Game from '../../pages/Game/Game';
import Home from '../../pages/Home/Home';
import News from '../../pages/News/News';
import Room from '../../pages/Room/Room';

const MainWrapper = (props) => {

  const setWrapperWithSidebarAndPage = props => {
    if (props.page === 'game') return selectPage(props)
    return (
      <div className="main-wrapper" data-testid="main-wrapper">
        <NavBar user={props.state.user}/>
        <div className="content-wrapper">
          <Sidebar page={props.page} state={props.state} dispatch={props.dispatch}/>
          <main>
            {selectPage(props)}
          </main>
        </div>
      </div>
    )
  }

  const selectPage = props =>{
    switch (props.page) {
      case 'account':
        return <Account state={props.state} dispatch={props.dispatch}/>
      case 'game':
        return <Game state={props.state} dispatch={props.dispatch}/>
      case 'home':
        return <Home state={props.state} dispatch={props.dispatch}/>
      case 'news':
        return <News state={props.state} dispatch={props.dispatch}/>
      case 'room':
        return <Room state={props.state} dispatch={props.dispatch}/>
      default:
        return <></>
    }
  }

  return (
    <>
      { setWrapperWithSidebarAndPage(props) }
    </>
  );
}

export default MainWrapper;