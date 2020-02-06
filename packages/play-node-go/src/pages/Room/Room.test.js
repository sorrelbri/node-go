import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { initState } from '../../reducers/init/reducer.init';
import Room from './Room';

const state = initState();
test('renders Room without crashing', () => {
  const { getByTestId } = render(
    <Router>
      <Room state={state} dispatch={() => {}}/>
    </Router>
  );
  const RoomDiv = getByTestId('Room');
  expect(RoomDiv).toBeInTheDocument();
});
