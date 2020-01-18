import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import NavBar from './NavBar';
import { initState } from '../../../reducers/init/stateReducer.init';

test('renders NavBar without crashing', () => {
  const { getByTestId } = render(
  <Router>
    <NavBar state={initState()}/>
  </Router>
  );
  const NavBarDiv = getByTestId('NavBar');
  expect(NavBarDiv).toBeInTheDocument();
});
