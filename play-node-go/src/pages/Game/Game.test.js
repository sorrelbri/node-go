import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from '@testing-library/react';
import { initState } from '../../reducers/init/reducer.init';
import Game from './Game';

const state = initState();
test('renders Game without crashing', () => {
  const { getByTestId } = render(
    <Router>
      <Game state={state} />
    </Router>
  );
  const GameDiv = getByTestId('Game');
  expect(GameDiv).toBeInTheDocument();
});
