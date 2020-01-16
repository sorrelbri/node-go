import React from 'react';
import { render } from '@testing-library/react';
import Game from './Game';

test('renders Game without crashing', () => {
  const { getByTestId } = render(<Game />);
  const GameDiv = getByTestId('Game');
  expect(GameDiv).toBeInTheDocument();
});
