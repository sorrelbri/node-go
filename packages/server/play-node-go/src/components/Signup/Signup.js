import React, { useState, useEffect } from 'react';
import './Signup.scss';
import authServices from '../../services/authServices';
import FormError from '../FormError/FormError';

const Signup = (props) => {
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const signupResponse = await authServices.signupService({
      username,
      email,
      password,
      confirmPassword
    })
    return props.dispatch({
      type: 'AUTH',
      message: 'SIGNUP',
      body: signupResponse
    })
  }

  const formError = errors => {
    if(!errors) return <></>;

    if (errors.auth) {
      return <FormError error={errors.auth}/>
    }
  }
  
  return (
    
    <div className="Signup" data-testid="Signup">
      {formError(props.state.errors)}
      <form 
        data-testid="Signup__form"
        onSubmit={e => handleSubmit(e)}
      >

        <label htmlFor="username-input">Username:</label>
        <input 
          name="username"
          id="username-input"
          type="text"
          onChange={e => setUsername(e.target.value)}
          default="username"
        />

        <label htmlFor="email-input">Email:</label>
        <input 
          name="email"
          id="email-input"
          type="text"
          onChange={e => setEmail(e.target.value)}
          default="email"
        />

        <label htmlFor="password-input">Password:</label>
        <input 
          name="password"
          id="password-input"
          type="password"
          onChange={e => setPassword(e.target.value)}
          default=""
        />

        <label htmlFor="confirmPassword-input">Confirm password:</label>
        <input 
          name="confirmPassword"
          id="confirmPassword-input"
          type="password"
          onChange={e => setConfirmPassword(e.target.value)}
          default=""
        />

        <input type="submit" value="Create Account!"/>

      </form>
    </div>
  );
}

export default Signup;