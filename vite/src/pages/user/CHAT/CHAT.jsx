import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPaperPlane, faUserPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './CHAT.css';

const users = [
  { id: 1, name: 'Docteur Strange', status: 'Actif', image: '/profil.jpg' },
  { id: 2, name: 'Tony Stark', status: 'Inactif', image: '/profil.jpg' },
  // ... autres utilisateurs
];

function Chat() {
  const [showGroupDetails, setShowGroupDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(users);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const dropdownRef = useRef(null);

  useEffect(() => {
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '20px',
      duration: 500,
      delay: 100,
      reset: true,
    });

    sr.reveal('.reveal');

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowGroupDetails(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleGroupDetails = () => {
    setShowGroupDetails(!showGroupDetails);
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term) {
      const results = users.filter(user =>
        user.name.toLowerCase().includes(term)
      );
      setSearchResults(results);
    } else {
      setSearchResults(users);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: newMessage, sender: 'user' }]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <div className='chatblock'>
        <div className="chat-container reveal">
          <div className="side">
            <div className="side-header">
              <h3 className='stay'>Discussion</h3>
            </div>
            <div className="search">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher un membre"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="group-members">
              <h3>Membres du groupe</h3>
              <ul>
                {searchResults.map(user => (
                  <li key={user.id}>
                    <img src={user.image} alt={user.name} className="member-avatar" />
                    <div className="member-info">
                      <span>{user.name}</span>
                      <span className="status">{user.status}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="chat-area">
            <div className="chat-header">
              <img src="/profil.jpg" alt="Group Logo" className="group-logo" />
              JUNIA XP
              <div className="chat-header-icons">
                <FontAwesomeIcon icon={faUserPlus} className="hover-icon" />
              </div>
            </div>
            <div className="messages">
              {messages.map(message => (
                <span key={message.id} className={`message ${message.sender}`}>
                  {message.text}
                </span>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Entrez votre message ..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button className="send-button" onClick={handleSendMessage}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
              <Link to="/CreateOutput" className="send-button">
                <FontAwesomeIcon icon={faPlusCircle} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
