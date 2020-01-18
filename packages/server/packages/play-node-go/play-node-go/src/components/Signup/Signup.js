import React, { useState, useEffect } from 'react';
import './Signup.scss';
import authServices from '../../services/authServices';
import FormError from '../FormError/FormError';

const Signup = (props) => {
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const minimumPasswordLength = 8;
  const errorDispatchAction = {
    type: 'ERR',
    message: 'AUTH_ERROR'
  }

  const validateSignupForm = (next) => {
    if (password !== confirmPassword) {
      return props.dispatch({
        ...errorDispatchAction,
        body: { authError: 'Password fields must be the same'}
      })
    }

    if (password.length < 8) {
      return props.dispatch({
        ...errorDispatchAction,
        body: { authError: 'Password must be at least 8 characters'}
      })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return props.dispatch({
        ...errorDispatchAction,
        body: { authError: 'Please enter a valid email'}
      })
    }
    
    if (!/^[\w\d_.-]+$/.test(username)) {
      return props.dispatch({
        ...errorDispatchAction,
        body: { authError: "Username can only contain letters, numbers, '_', '.', or '-'"}
      })
    }

    return next();
  }

  const postSignupForm = async () => {
    const signupResponse = await authServices.signupService({
      username,
      email,
      password,
      confirmPassword
    })
    const parsedResponse = JSON.parse(signupResponse)
    
    if (parsedResponse.errors) {
      const authError = parsedResponse.errors[0].auth
      return props.dispatch({
        ...errorDispatchAction,
        body: { authError }
      })
    }

    return props.dispatch({
      type: 'AUTH',
      message: 'SIGNUP',
      body: parsedResponse
    })
  }

  const handleSubmit = async e => {
    e.preventDefault();
    validateSignupForm(postSignupForm);
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