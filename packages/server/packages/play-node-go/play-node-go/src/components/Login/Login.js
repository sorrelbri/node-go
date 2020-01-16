import React, { useState } from 'react';
import './Login.scss';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="Login" data-testid="Login">
      <form data-testid="Login__form">

      <label htmlFor="username-input">Username:</label>
        <input 
          name="username"
          id="username-input"
          type="text"
          onChange={e => setUsername(e.target.value)}
          default="username"
          />

        <label htmlFor="password-input">Password:</label>
        <input 
          name="password"
          id="password-input"
          type="text"
          onChange={e => setPassword(e.target.value)}
          default=""
        />

        <input type="submit" value="Login!" />

      </form>
    </div>
  );
}

export default Login;