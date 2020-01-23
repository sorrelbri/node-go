import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Game from './Game';

const gameData = {
  id: 1,
  name: "main",
  description: "A general place to play Go",
  language: "EN"
}

test('renders GameButton without crashing', () => {
  const { getByTestId } = render(
    <Router>
      <Game game={gameData} />
    </Router>
  );
  const GameButton = getByTestId('GameButton');
  expect(GameButton).toBeInTheDocument();
});

