import React from 'react';
import FindGameForm from '../../components/Form/FindGame/FindGame';
import NewGameButton from '../../components/Button/NewGame/NewGame';
import RoomArchiveButton from '../../components/Button/RoomArchive/RoomArchive';

const RoomSidebar = () => {
  return (  
    <>
      <FindGameForm />
      <NewGameButton />
      <RoomArchiveButton />
    </>
  );
}

export default RoomSidebar;