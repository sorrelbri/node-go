import React from 'react';
import { render } from '@testing-library/react';
import Signup from './Signup';
import { initState } from '../../../reducers/init/reducer.init';

test('renders Signup without crashing', () => {
  const { getByTestId } = render(<Signup state={initState()}/>);
  const SignupDiv = getByTestId('Signup');
  expect(SignupDiv).toBeInTheDocument();
});
