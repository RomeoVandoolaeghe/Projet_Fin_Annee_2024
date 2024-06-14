import React, { useState, useEffect, useRef } from 'react';
import ScrollReveal from 'scrollreveal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPaperPlane, faUserPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './CHAT.css';

// Simuler une base de données fictive
const users = [
  { id: 1, name: 'Docteur Strange', status: 'Actif', image: '/profil.jpg' },
  { id: 2, name: 'Tony Stark', status: 'Inactif', image: '/profil.jpg' },
  { id: 3, name: 'Steve Rogers', status: 'Actif', image: '/profil.jpg' },
  { id: 4, name: 'Natasha Romanoff', status: 'Actif', image: '/profil.jpg' },
  { id: 5, name: 'Bruce Banner', status: 'Inactif', image: '/profil.jpg' },
  { id: 6, name: 'Clint Barton', status: 'Actif', image: '/profil.jpg' },
  { id: 8, name: 'Wanda Maximoff', status: 'Actif', image: '/profil.jpg' },
  { id: 9, name: 'Natasha Romanoff', status: 'Actif', image: '/profil.jpg' },
  { id: 10, name: 'Bruce Banner', status: 'Inactif', image: '/profil.jpg' },
  { id: 11, name: 'Clint Barton', status: 'Actif', image: '/profil.jpg' },
  { id: 12, name: 'Wanda Maximoff', status: 'Actif', image: '/profil.jpg' },
  { id: 13, name: 'Natasha Romanoff', status: 'Actif', image: '/profil.jpg' },
  { id: 14, name: 'Bruce Banner', status: 'Inactif', image: '/profil.jpg' },
  { id: 15, name: 'Clint Barton', status: 'Actif', image: '/profil.jpg' },
  { id: 16, name: 'Wanda Maximoff', status: 'Actif', image: '/profil.jpg' },
  { id: 17, name: 'Natasha Romanoff', status: 'Actif', image: '/profil.jpg' },
  { id: 18, name: 'Bruce Banner', status: 'Inactif', image: '/profil.jpg' },
  { id: 19, name: 'Clint Barton', status: 'Actif', image: '/profil.jpg' },
  { id: 20, name: 'Wanda Maximoff', status: 'Actif', image: '/profil.jpg' },
  // Ajoutez d'autres utilisateurs fictifs si nécessaire
];

function Chat() {
  const [showGroupDetails, setShowGroupDetails] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(users);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Configuration de base de ScrollReveal
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '20px',
      duration: 500,
      delay: 100,
      reset: true, // Animation réapparaît à chaque défilement
    });

    // Appliquer l'animation aux éléments avec la classe "reveal"
    sr.reveal('.reveal');

    // Ajouter un écouteur d'événements pour les clics en dehors du dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowGroupDetails(false);
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Nettoyer l'écouteur d'événements à la désactivation du composant
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleGroupDetails = () => {
    setShowGroupDetails(!showGroupDetails);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
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
      setMessages([...messages, { id: messages.length + 1, text: newMessage }]);
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
              <h3 className='header'>Discussion</h3>
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
              <img src="/profil.jpg" alt="Group Logo" className="group-logo" /> {/* Ajoutez votre logo de groupe ici */}
              JUNIA XP
              <div className="chat-header-icons">
                <FontAwesomeIcon icon={faUserPlus} className="hover-icon" />
              </div>
            </div>
            <div className="messages">
              {messages.map(message => (
                <span key={message.id} className="message">
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
                ref={inputRef}
              />
              <button className="send-button" onClick={handleSendMessage}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
