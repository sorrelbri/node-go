import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login';

test('renders app without crashing', () => {
  const { getByTestId } = render(<Login />);
  const LoginDiv = getByTestId('Login');
  expect(LoginDiv).toBeInTheDocument();
});
