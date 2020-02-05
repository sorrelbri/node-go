import React, { useState } from 'react';
import './Sidebar.scss';

import AccountSidebar from '../../Account/AccountSidebar';
import HomeSidebar from '../../Home/HomeSidebar';
import NewsSidebar from '../../News/NewsSidebar';
import RoomSidebar from '../../Room/RoomSidebar';

const Sidebar = (props) => {
  const {page, state, dispatch} = props
  const displayComponent = () =>{
    switch (page) {
      case 'account':
        return <AccountSidebar state={state} dispatch={dispatch}/>
      case 'home':
        return <HomeSidebar state={state} dispatch={dispatch}/>
      case 'news':
        return <NewsSidebar state={state} dispatch={dispatch}/>
      case 'room':
        return <RoomSidebar state={state} dispatch={dispatch}/>
      default:
        return <></>
    }
  }

  return (
    <aside className="Sidebar" data-testid="Sidebar">
      {displayComponent()}
    </aside>
  );
}

export default Sidebar;