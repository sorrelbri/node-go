import React from 'react';
import { render } from '@testing-library/react';
import FormError from './FormError';

test('renders FormError without crashing', () => {
  const { getByTestId } = render(<FormError />);
  const FormErrorSpan = getByTestId('FormError');
  expect(FormErrorSpan).toBeInTheDocument();
});

test('renders FormError with error message', () => {
  const errorMessage = "User already exists!";
  const { getByTestId } = render(<FormError error={errorMessage}/>);
  const FormErrorSpan = getByTestId('FormError');
  expect(FormErrorSpan).toHaveTextContent(errorMessage);
  
})
