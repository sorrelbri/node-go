import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Room from './Room';

const roomData = {
  id: 1,
  name: "main",
  description: "A general place to play Go",
  language: "EN"
}

test('renders RoomButton without crashing', () => {
  const { getByTestId } = render(
    <Router>
      <Room room={roomData} />
    </Router>
  );
  const RoomButton = getByTestId('RoomButton');
  expect(RoomButton).toBeInTheDocument();
});

test('renders RoomButton with Room name', () => {
  const { getByTestId } = render(
    <Router>
      <Room room={roomData} />
    </Router>
  );
  const RoomButton = getByTestId('RoomButton');
  expect(RoomButton).toHaveTextContent('main');
});

