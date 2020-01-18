import React from 'react';
import './FormError.scss';

const FormError = (props) => {
  const errorMessage = props.error;
  return (
    <span data-testid="FormError" className="FormError">
      {errorMessage}
    </span>
    );
}

export default FormError;