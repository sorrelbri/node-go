import React from 'react';
import './FormError.scss';

const FormError = (props) => {
  const errorMessage = props.error;
  return (
    <span 
      className="error error--form"
      data-testid="FormError" 
    >
      {errorMessage}
    </span>
    );
}

export default FormError;