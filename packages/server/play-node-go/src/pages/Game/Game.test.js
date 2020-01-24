import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from '@testing-library/react';
import Game from './Game';

test('renders Game without crashing', () => {
  const { getByTestId } = render(
    <Router>
      <Game />
    </Router>
  );
  const GameDiv = getByTestId('Game');
  expect(GameDiv).toBeInTheDocument();
});
