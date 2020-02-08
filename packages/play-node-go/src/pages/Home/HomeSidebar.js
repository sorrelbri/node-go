import React from 'react';

import Auth from '../../components/Form/Auth/Auth';
import NewRoomButton from '../../components/Button/NewRoom/NewRoom';
import FindRoomForm from '../../components/Form/FindRoom/FindRoom';
import LibraryButton from '../../components/Button/Library/Library';

const HomeSidebar = (props) => {
  const { state, dispatch } = props;

  const ifUser = <>
    <FindRoomForm />
    <NewRoomButton />
    <LibraryButton />
  </>

  const ifNoUser = <Auth state={state} dispatch={dispatch} />

  return (  
    <nav>
      {
        state.user.username 
        ? ifUser 
        : ifNoUser
      }
    </nav>
  );
}

export default HomeSidebar;