import React from 'react';
import './ActionError.scss';

const ActionError = (props) => {
  const errorMessage = props.error;
  return (
    <span 
      className="error error--action"
      data-testid="ActionError" 
    >
      {errorMessage}
    </span>
    );
}

export default ActionError;