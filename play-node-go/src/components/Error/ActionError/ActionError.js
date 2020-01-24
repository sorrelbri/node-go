import React from 'react';
import './ActionError.scss';

const ActionError = (props) => {
  const errorMessage = props.error;
  return (
    <span data-testid="ActionError" className="ActionError">
      {errorMessage}
    </span>
    );
}

export default ActionError;