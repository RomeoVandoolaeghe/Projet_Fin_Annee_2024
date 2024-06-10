import React, { useEffect, useState } from 'react';
import ScrollReveal from 'scrollreveal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPaperPlane, faCog, faUserPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './Chat.css';

// Simuler une base de données fictive
const users = [
  { id: 1, name: 'Docteur Strange', status: 'Actif', image: '/Trio_One Piece.jpg' },
  { id: 2, name: 'Tony Stark', status: 'Inactif', image: '/Sasuke.jpg' },
  { id: 3, name: 'Steve Rogers', status: 'Actif', image: '/Saitama_Ange.jpg' },
  { id: 4, name: 'Natasha Romanoff', status: 'Actif', image: '/Petit_naruto.jpg' },
  { id: 5, name: 'Bruce Banner', status: 'Inactif', image: '/Nature.jpg' },
  { id: 6, name: 'Clint Barton', status: 'Actif', image: '/Natsu_Dragon.jpg' },
  { id: 8, name: 'Wanda Maximoff', status: 'Actif', image: '/Naruto_Berserk.jpg' },
  { id: 9, name: 'Natasha Romanoff', status: 'Actif', image: '/Naruto.jpg' },
  { id: 10, name: 'Bruce Banner', status: 'Inactif', image: '/Natsu_Dragon.jpg' },
  { id: 11, name: 'Clint Barton', status: 'Actif', image: '/Naruto.jpg' },
  { id: 12, name: 'Wanda Maximoff', status: 'Actif', image: '/Luffy_phoenix.jpg' },
  { id: 13, name: 'Natasha Romanoff', status: 'Actif', image: '/Luffy.jpg' },
  { id: 14, name: 'Bruce Banner', status: 'Inactif', image: '/Kakashi.jpg' },
  { id: 15, name: 'Clint Barton', status: 'Actif', image: '/Ichigo_Samurai.jpg' },
  { id: 16, name: 'Wanda Maximoff', status: 'Actif', image: '/Ichigo_chevalier.jpg' },
  { id: 17, name: 'Natasha Romanoff', status: 'Actif', image: '/Gaara.jpg' },
  { id: 18, name: 'Bruce Banner', status: 'Inactif', image: '/Goku_Ange.jpg' },
  { id: 19, name: 'Clint Barton', status: 'Actif', image: '/Chevalier.jpg' },
  { id: 20, name: 'Wanda Maximoff', status: 'Actif', image: '/Sortie.jpg' },
  // Ajoutez d'autres utilisateurs fictifs si nécessaire
];

function Chat() {
  const [showGroupDetails, setShowGroupDetails] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(users);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

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

  return (
    <div className="chat-container reveal">
      <div className="sidebar">
        <div className="sidebar-header">
          <FontAwesomeIcon icon={faCog} className="settings-icon hover-icon" onClick={toggleSettings} />
          <h3>Discussion</h3>
          <FontAwesomeIcon icon={faUserPlus} className="add-user-icon hover-icon" />
          {showSettings && (
            <div className="settings-dropdown">
              <ul>
                <li>Profil</li>
                <li>Paramètres</li>
                <li>Déconnexion</li>
              </ul>
            </div>
          )}
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
          <img src="/high-angle-shot-wooden-deck-seashore-leading-sea-sunset.jpg" alt="Group Logo" className="group-logo" /> {/* Ajoutez votre logo de groupe ici */}
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
        <div className="messages">
          {messages.map(message => (
            <div key={message.id} className="message">{message.text}</div>
          ))}
        </div>
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
      </div>
    </div>
  );
}

export default Chat;
