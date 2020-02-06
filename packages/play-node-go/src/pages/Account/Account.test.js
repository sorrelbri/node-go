import React from 'react';
import { render } from '@testing-library/react';
import Account from './Account';

test('renders Account without crashing', () => {
  const { getByTestId } = render(<Account />);
  const AccountDiv = getByTestId('Account');
  expect(AccountDiv).toBeInTheDocument();
});
