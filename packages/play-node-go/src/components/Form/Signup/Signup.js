import React, { useState, useEffect } from 'react';
import './Signup.scss';
import authServices from '../../../services/authServices';
import FormError from '../../Error/FormError/FormError';

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

    if (signupResponse.errors) {
      const authError = signupResponse.errors[0].auth
      return props.dispatch({
        ...errorDispatchAction,
        body: { authError }
      })
    }

    return props.dispatch({
      type: 'AUTH',
      message: 'SIGNUP',
      body: signupResponse
    })
  }

  const handleSubmit = e => {
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
        className="Signup__form"
        data-testid="Signup__form"
        onSubmit={e => handleSubmit(e)}
      >

        <label 
          className="form__label form__label--username"
          htmlFor="username-input"
        >Username:</label>
        <input 
          className="form__input form__input--username"
          default="username"
          id="username-input"
          name="username"
          onChange={e => setUsername(e.target.value)}
          type="text"
        />

        <label 
          className="form__label form__label--email"
          htmlFor="email-input"
        >Email:</label>
        <input 
          className="form__input form__input--email"
          default="email"
          id="email-input"
          name="email"
          onChange={e => setEmail(e.target.value)}
          type="text"
        />

        <label 
          className="form__label form__label--password"
          htmlFor="password-input"
        >Password:</label>
        <input
          className="form__input form__input--password" 
          default=""
          id="password-input"
          name="password"
          onChange={e => setPassword(e.target.value)}
          type="password"
          />

        <label 
          className="form__label form__label--password"
          htmlFor="confirmPassword-input"
          >Confirm password:</label>
        <input 
          className="form__input form__input--password" 
          name="confirmPassword"
          id="confirmPassword-input"
          type="password"
          onChange={e => setConfirmPassword(e.target.value)}
          default=""
        />

        <input 
          className="form__submit"
          type="submit" 
          value="Create Account!"
        />

      </form>
    </div>
  );
}

export default Signup;