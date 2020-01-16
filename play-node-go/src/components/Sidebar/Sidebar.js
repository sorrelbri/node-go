import React, { useState } from 'react';
import './Sidebar.scss';

import AccountSidebar from '../../pages/Account/AccountSidebar';
import GameSidebar from '../../pages/Game/GameSidebar';
import HomeSidebar from '../../pages/Home/HomeSidebar';
import NewsSidebar from '../../pages/News/NewsSidebar';
import RoomSidebar from '../../pages/Room/RoomSidebar';

const Sidebar = (props) => {

  const displayComponent = props =>{
    switch (props.page) {
      case 'account':
        return <AccountSidebar state={props.state}/>
      case 'game':
        return <GameSidebar state={props.state}/>
      case 'home':
        return <HomeSidebar state={props.state}/>
      case 'news':
        return <NewsSidebar state={props.state}/>
      case 'room':
        return <RoomSidebar state={props.state}/>
      default:
        return <></>
    }
  }

  return (
    <aside className="Sidebar" data-testid="Sidebar">
      {displayComponent(props)}
    </aside>
  );
}

export default Sidebar;