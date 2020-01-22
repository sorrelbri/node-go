import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Room from './Room';

test('renders Room without crashing', () => {
  const { getByTestId } = render(
    <Router>
      <Room />
    </Router>
  );
  const RoomDiv = getByTestId('Room');
  expect(RoomDiv).toBeInTheDocument();
});
