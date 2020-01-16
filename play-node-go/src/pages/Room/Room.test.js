import React from 'react';
import { render } from '@testing-library/react';
import Room from './Room';

test('renders Room without crashing', () => {
  const { getByTestId } = render(<Room />);
  const RoomDiv = getByTestId('Room');
  expect(RoomDiv).toBeInTheDocument();
});
