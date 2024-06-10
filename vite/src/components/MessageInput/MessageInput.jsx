import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './MessageInput.css';

const MessageInput = ({ newMessage, setNewMessage, handleSendMessage }) => (
  <div className="chat-input">
    <input
      type="text"
      placeholder="Entrez votre message ..."
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
    />
    <button className="send-button" onClick={handleSendMessage}>
      <FontAwesomeIcon icon={faPaperPlane} />
    </button>
  </div>
);

export default MessageInput;
