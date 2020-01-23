import React from 'react';
import './Message.scss';

const Message = (props) => {
  const messageData = props.message;
  return (
    <div className="Message" data-testid="Message">
      <p>{messageData.content}</p>
      <p>{messageData.username}</p>
      <p>{messageData.admin ? 'admin' : <></>}</p>
    </div>
  );
}

export default Message;