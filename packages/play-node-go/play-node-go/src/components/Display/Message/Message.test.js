import React from 'react';
import { render } from '@testing-library/react';
import Message from './Message';

const messageData = [
  {
  "content": "Hey! Welcome to the general room!", "username": "userOne", "admin": true
  }
];

test('renders Message without crashing', () => {
  const { getByTestId } = render( <Message message={messageData} /> );
  const messageDiv = getByTestId('Message');
  expect(messageDiv).toBeInTheDocument();
});

