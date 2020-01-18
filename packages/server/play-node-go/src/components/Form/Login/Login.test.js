import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login';
import { initState } from '../../reducers/init/stateReducer.init';

test('renders Login without crashing', () => {
  const state = initState();
  const { getByTestId } = render(<Login state={state}/>);
  const LoginDiv = getByTestId('Login');
  expect(LoginDiv).toBeInTheDocument();
});
