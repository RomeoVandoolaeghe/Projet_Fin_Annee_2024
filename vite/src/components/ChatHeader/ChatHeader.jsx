import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './ChatHeader.css';

const ChatHeader = ({ toggleGroupDetails, showGroupDetails }) => (
  <div className="chat-header">
    <img src="/high-angle-shot-wooden-deck-seashore-leading-sea-sunset.jpg" alt="Group Logo" className="group-logo" />
    JUNIA XP
    <div className="chat-header-icons">
      <FontAwesomeIcon icon={faUserPlus} className="hover-icon" />
      <FontAwesomeIcon icon={faInfoCircle} className="hover-icon" onClick={toggleGroupDetails} />
    </div>
    {showGroupDetails && (
      <div className="group-details">
        <h4>Détail du groupe</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.</p>
      </div>
    )}
  </div>
);

export default ChatHeader;
