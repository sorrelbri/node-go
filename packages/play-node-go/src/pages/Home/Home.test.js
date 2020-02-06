import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';

test('renders Home without crashing', () => {
  const { getByTestId } = render(<Home />);
  const HomeDiv = getByTestId('Home');
  expect(HomeDiv).toBeInTheDocument();
});
