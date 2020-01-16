import React, { useState } from 'react';
import './Login.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="Login" data-testid="Login">

    </div>
  );
}
 
export default Login;