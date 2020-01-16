import React, { useState } from 'react';

import Signup from '../../components/Signup/Signup';
import Login from '../../components/Login/Login';

const HomeSidebar = (props) => {
  const [ showForm, setShowForm ] = useState('');

  return (  
    <nav>
      {props.state.user ? <></> : <>
        <p onClick={()=>{setShowForm('login')}}>Login</p>
        <p onClick={()=>{setShowForm('signup')}}>Signup</p>
      </>}
      {showForm === 'signup' ? <Signup /> : <></>}
      {showForm === 'login' ? <Login /> : <></>}
    </nav>
  );
}

export default HomeSidebar;