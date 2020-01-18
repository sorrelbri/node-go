import React from 'react';
import FindGameForm from '../../components/Form/FindGame/FindGame';
import NewGameButton from '../../components/Button/NewGame/NewGame';
import ArchiveButton from '../../components/Button/Archive/Archive';

const RoomSidebar = () => {
  return (  
    <>
      <FindGameForm />
      <NewGameButton />
      <ArchiveButton />
    </>
  );
}

export default RoomSidebar;