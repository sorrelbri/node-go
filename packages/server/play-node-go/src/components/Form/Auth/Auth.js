import React, { useState } from 'react';

import Login from '../Login/Login';
import Signup from '../Signup/Signup';

const Auth = (props) => {
  const [ showForm, setShowForm ] = useState('login')
  const { state, dispatch } = props;

  return (
    <>
      <p 
        className="auth-label" 
        onClick={()=>{setShowForm('login')}}
      >Login</p>
      {
        showForm === 'login' 
        ? <Login dispatch={dispatch} state={state}/> 
        : <></>
      }

      <p 
        className="auth-label" 
        onClick={()=>{setShowForm('signup')}}
      >Signup</p>
      {
        showForm === 'signup' 
        ? <Signup dispatch={dispatch} state={state}/> 
        : <></>
      }
    </>
  );
}

export default Auth;
