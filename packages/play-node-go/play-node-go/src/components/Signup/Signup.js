import React, { useState } from 'react';
import './Signup.scss';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  return (
    <div className="Signup" data-testid="Signup">
      
    </div>
  );
}
 
export default Signup;