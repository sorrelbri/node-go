import React from 'react';
import { render } from '@testing-library/react';
import ActionError from './ActionError';

test('renders ActionError without crashing', () => {
  const { getByTestId } = render(<ActionError />);
  const ActionErrorSpan = getByTestId('ActionError');
  expect(ActionErrorSpan).toBeInTheDocument();
});

test('renders ActionError with error message', () => {
  const errorMessage = "User already exists!";
  const { getByTestId } = render(<ActionError error={errorMessage}/>);
  const ActionErrorSpan = getByTestId('ActionError');
  expect(ActionErrorSpan).toHaveTextContent(errorMessage);
  
})
