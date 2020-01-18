import React, { useState } from 'react';

import Signup from '../../components/Form/Signup/Signup';
import Login from '../../components/Form/Login/Login';
import NewRoomButton from '../../components/Button/NewRoom/NewRoom';
import FindRoomForm from '../../components/Form/FindRoom/FindRoom';
import LibraryButton from '../../components/Button/Library/Library';

const HomeSidebar = (props) => {
  const [ showForm, setShowForm ] = useState('');

  const ifUser = <>
    <FindRoomForm />
    <NewRoomButton />
    <LibraryButton />
  </>

  const ifNoUser = <>
    <p onClick={()=>{setShowForm('login')}}>Login</p>
    {showForm === 'login' ? <Login dispatch={props.dispatch} state={props.state}/> : <></>}
    <p onClick={()=>{setShowForm('signup')}}>Signup</p>
    {showForm === 'signup' ? <Signup dispatch={props.dispatch} state={props.state}/> : <></>}
  </>

  return (  
    <nav>
      {props.state.user ? ifUser : ifNoUser}
    </nav>
  );
}

export default HomeSidebar;