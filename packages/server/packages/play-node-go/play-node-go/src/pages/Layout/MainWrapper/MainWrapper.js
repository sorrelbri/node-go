import React, { useState } from 'react';
import './MainWrapper.scss';

import NavBar from '../NavBar/NavBar';
import Sidebar from '../Sidebar/Sidebar';
import Account from '../../Account/Account';
import Game from '../../Game/Game';
import Home from '../../Home/Home';
import News from '../../News/News';
import Room from '../../Room/Room';

const MainWrapper = (props) => {
  const { state, page, dispatch } = props;

  const setWrapperWithSidebarAndPage = () => {
    if (page === 'game') return selectPage()
    return (
      <div className="main-wrapper" data-testid="main-wrapper">
        <NavBar state={state}/>
        <div className="content-wrapper">
          <Sidebar page={page} state={state} dispatch={dispatch}/>
          <main>
            {selectPage()}
          </main>
        </div>
      </div>
    )
  }

  const selectPage = () =>{
    switch (page) {
      case 'account':
        return <Account state={state} dispatch={dispatch}/>
      case 'game':
        return <Game state={state} dispatch={dispatch}/>
      case 'home':
        return <Home state={state} dispatch={dispatch}/>
      case 'news':
        return <News state={state} dispatch={dispatch}/>
      case 'room':
        return <Room state={state} dispatch={dispatch}/>
      default:
        return <></>
    }
  }

  return (
    <>
      { setWrapperWithSidebarAndPage() }
    </>
  );
}

export default MainWrapper;