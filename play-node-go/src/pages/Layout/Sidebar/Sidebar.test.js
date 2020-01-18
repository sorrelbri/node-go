import React from 'react';
import { render } from '@testing-library/react';
import Sidebar from './Sidebar';

test('renders Sidebar without crashing', () => {
  const { getByTestId } = render(<Sidebar />);
  const SidebarDiv = getByTestId('Sidebar');
  expect(SidebarDiv).toBeInTheDocument();
});
