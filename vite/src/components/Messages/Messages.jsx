import React from 'react';
import './Messages.css';

const Messages = ({ messages }) => (
  <div className="messages">
    {messages.map(message => (
      <div key={message.id} className="message">{message.text}</div>
    ))}
  </div>
);

export default Messages;
