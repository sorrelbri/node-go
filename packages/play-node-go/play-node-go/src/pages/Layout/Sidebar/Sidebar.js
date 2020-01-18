import React, { useState } from 'react';
import './Sidebar.scss';

import AccountSidebar from '../../Account/AccountSidebar';
import HomeSidebar from '../../Home/HomeSidebar';
import NewsSidebar from '../../News/NewsSidebar';
import RoomSidebar from '../../Room/RoomSidebar';

const Sidebar = (props) => {

  const displayComponent = props =>{
    switch (props.page) {
      case 'account':
        return <AccountSidebar state={props.state} dispatch={props.dispatch}/>
      case 'home':
        return <HomeSidebar state={props.state} dispatch={props.dispatch}/>
      case 'news':
        return <NewsSidebar state={props.state} dispatch={props.dispatch}/>
      case 'room':
        return <RoomSidebar state={props.state} dispatch={props.dispatch}/>
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