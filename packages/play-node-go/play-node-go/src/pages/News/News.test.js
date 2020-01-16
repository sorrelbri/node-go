import React from 'react';
import { render } from '@testing-library/react';
import News from './News';

test('renders News without crashing', () => {
  const { getByTestId } = render(<News />);
  const NewsDiv = getByTestId('News');
  expect(NewsDiv).toBeInTheDocument();
});
