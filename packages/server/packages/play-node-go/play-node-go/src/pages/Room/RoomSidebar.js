import React from 'react';

import Auth from '../../components/Form/Auth/Auth';
import FindGameForm from '../../components/Form/FindGame/FindGame';
import NewGameButton from '../../components/Button/NewGame/NewGame';
import RoomArchiveButton from '../../components/Button/RoomArchive/RoomArchive';

const RoomSidebar = props => {
  const {state, dispatch} = props;

  const showAuth = () => {
    if (state.errors.joinGame) {
      return (
        <Auth state={state} dispatch={dispatch} />
      )
    }
    return <></>
  }

  return (  
    <nav>
      {showAuth()}
      <FindGameForm />
      <NewGameButton />
      <RoomArchiveButton />
    </nav>
  );
}

export default RoomSidebar;