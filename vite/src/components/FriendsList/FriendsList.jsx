import React, { useEffect, useState } from 'react';
import { FaCheck, FaTimes, FaTrashAlt } from 'react-icons/fa';
import './FriendsList.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const group = [
  { name: 'SEIRIN' },
  { name: 'JABBERWORKS' },
  { name: 'TOHO' },
];

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState(group);
  const [error, setError] = useState(null);
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Nouvel état pour le message d'erreur

  useEffect(() => {
    const fetchAmis = async () => {
      try {
        const response = await axios.get('http://localhost:3000/friends', { withCredentials: true });
        if (response.data && Array.isArray(response.data)) {
          setFriends(response.data);
          console.log("mes amis :", response.data);
        } else {
          setErrorMessage("Vous n'avez pas encore d'amis"); // Mise à jour du message d'erreur
          console.error('Les données reçues ne sont pas valides', response.data);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchAmis();
  }, []);

  return (
    <div>
      <div className="list-container friends-list">
        <div className="friends-list-header">
          <h4>Liste d’amis</h4>
          <Link to="/AddFriend"><button className="toggle-del">Gérer des amis</button></Link>
        </div>
        {errorMessage && <h5 id='Erreur'>{errorMessage}</h5>} {/* Affichage du message d'erreur */}
        <ul>
          {friends.map((friend, index) => (
            <li key={index}>
              {friend.Pseudo}
            </li>
          ))}
        </ul>
        {error && <p className="error">{error.message}</p>}
        <h4 className='threat'>Mes groupes</h4>
        <ul>
          {groups.map((group, index) => (
            <li key={index}>
              {group.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FriendsList;
