import React, { useState } from 'react';
import './Login.scss';
import authServices from '../../../services/authServices';
import FormError from '../../Error/FormError/FormError';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const minimumPasswordLength = 8;
  const errorDispatchAction = {
    type: 'ERR',
    message: 'AUTH_ERROR'
  }

  const validateLoginForm = next => {
    if (password.length < minimumPasswordLength) {
      return props.dispatch({
        ...errorDispatchAction,
        body: { authError: 'This password is invalid'}
      })
    }

    if (!/^[\w\d_.-]+$/.test(username)) {
      return props.dispatch({
        ...errorDispatchAction,
        body: { authError: "This username is invalid"}
      })
    }
    
    next();
  }


  const postLoginForm = async () => {
    const loginResponse = await authServices.loginService({
      username,
      password
    })
    if (loginResponse.errors) {
      const authError = loginResponse.errors
      return props.dispatch({
        ...errorDispatchAction,
        body: { authError }
      })
    }

    return props.dispatch({
      type: 'AUTH',
      message: 'LOGIN',
      body: loginResponse
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    validateLoginForm(postLoginForm);
  }

  const formError = errors => {
    if(!errors) return <></>;

    if (errors.auth) {
      return <FormError error={errors.auth}/>
    }
  }

  return (
    <div className="Login" data-testid="Login">
      {formError(props.state.errors)}
      <form 
        className="Login__form"
        data-testid="Login__form"
        onSubmit={e => handleSubmit(e)}
      >

      <label 
        className="form__label form__label--username" 
        htmlFor="username-input"
      >Username:</label>
        <input 
          name="username"
          id="username-input"
          className="form__input form__input--username"
          type="text"
          onChange={e => setUsername(e.target.value)}
          default="username"
          />

        <label 
          className="form__label form__label--password"
          htmlFor="password-input"
        >Password:</label>
        <input 
          name="password"
          id="password-input"
          className="form__input form__input--password"
          type="password"
          onChange={e => setPassword(e.target.value)}
          default=""
        />

        <input 
          className="form__submit"
          type="submit" 
          value="Login!" 
        />

      </form>
    </div>
  );
}

export default Login;