import React, { useState } from 'react';

import Login from '../Login/Login';
import Signup from '../Signup/Signup';

const Auth = (props) => {
  const [ showForm, setShowForm ] = useState('login')
  const { state, dispatch } = props;

  return (
    <>
      <div 
        className="nav__section nav__section--auth" 
        onClick={()=>{setShowForm('login')}}
      >
        <p 
          className="nav__section__label"
        >Login</p>

        {
          showForm === 'login' 
          ? <Login dispatch={dispatch} state={state}/> 
          : <></>
        }
      </div>

      <div
        className="nav__section nav__section--auth" 
        onClick={()=>{setShowForm('signup')}}
      >
        <p 
          className="nav__section__label"
        >Signup</p>

      {
        showForm === 'signup' 
        ? <Signup dispatch={dispatch} state={state}/> 
        : <></>
      }
      </div>
    </>
  );
}

export default Auth;
