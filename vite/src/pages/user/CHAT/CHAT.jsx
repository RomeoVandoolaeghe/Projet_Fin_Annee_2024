import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPaperPlane, faUserPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './CHAT.css';
import { FaComments } from 'react-icons/fa';
import Navbar from '../../../components/Navbar/Navbar';
import axios from 'axios';

const users = [
  { id: 1, name: 'Docteur Strange', status: 'Actif', image: '/profil.jpg' },
];

function Chat() {
  const [showGroupDetails, setShowGroupDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(users);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const dropdownRef = useRef(null);
  const groupNameRef = useRef(null);
  const navigate = useNavigate(); // Utilisation du hook useNavigate

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

  const groupNAME = localStorage.getItem('nomgroupe');
  const groupID = localStorage.getItem('idgroupe');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/recup_message/${groupID}`, { withCredentials: true });
        console.log('Messages :', response.data);
        setMessages(response.data);
        console.log('Messages récupérés avec succès', response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des messages ", error);
      }
    };

    fetchMessages();
  }, [groupID]);

  useEffect(() => {
    if (groupNameRef.current) {
      groupNameRef.current.textContent = groupNAME;
    }
  }, [groupNAME]);

<<<<<<< HEAD
  const toggleGroupDetails = () => {
    setShowGroupDetails(!showGroupDetails);
=======
  const fetchGroupMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/group_members/${groupID}`, { withCredentials: true });
      setGroupMembers(response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des membres du groupe ", error);
    }
>>>>>>> 0f005a2d624d3806205f0da7c80c78d182dd0d74
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
    axios.post('http://localhost:3000/send_messages', { Contenu: newMessage, ID_Groupe: groupID }, { withCredentials: true })
      .then((response) => {
        console.log('Message envoyé avec succès', response);
        // location.reload(); // Recharger la page après l'envoi du message
      })
      .catch((error) => {
        console.error('Erreur lors de l\'envoi du message', error);
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleAddMember = () => {
    navigate('/AddMember');
  };

  return (
    <>
      <Navbar />
      <div className='header'>
        <h3>
          CHAT <FaComments size={20} />
        </h3>
      </div>
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
              <h3 id='group-name' ref={groupNameRef}></h3>
              <div className="chat-header-icons">
                <FontAwesomeIcon icon={faUserPlus} className="hover-icon" onClick={handleAddMember} />
              </div>
            </div>
            <div className="messages">
              {messages.map(message => (
<<<<<<< HEAD
                <span className='message'>
                  {message.ID_Utilisateur + " :"}
                  {message.Contenu}
=======
                <span className='message' key={message.ID_Message}>
                  <strong>{message.Pseudo}:</strong> {message.Contenu}
>>>>>>> 0f005a2d624d3806205f0da7c80c78d182dd0d74
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
