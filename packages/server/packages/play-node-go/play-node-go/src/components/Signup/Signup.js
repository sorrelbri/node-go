import React, { useState } from 'react';
import './Signup.scss';

const Signup = (props) => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');

  return (
    <div className="Signup" data-testid="Signup">
      <form data-testid="Signup__form">
        
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

        <label htmlFor="confirmPassword-input">Confirm password:</label>
        <input 
          name="confirmPassword"
          id="confirmPassword-input"
          type="text"
          onChange={e => setConfirmPassword(e.target.value)}
          default=""
        />

        <input type="submit" value="Create Account!"/>

      </form>
    </div>
  );
}

export default Signup;