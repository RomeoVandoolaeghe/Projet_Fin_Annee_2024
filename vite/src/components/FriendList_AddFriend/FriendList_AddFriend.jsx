import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaTrashAlt } from 'react-icons/fa';
import './FriendList_AddFriend.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);


  const handleDeleteClick = (pseudo) => {
   
    const url = 'http://localhost:3000/delete_ami';
    axios
      .post(url, {pseudo}, { withCredentials: true })
      .then((response) => {
        console.log('Réponse du serveur:', response.data);
        location.reload();
      })
      .catch((error) => {
        console.error('Erreur lors de la requête POST:', error);
        setError('Une erreur est survenue lors de la recherche.');
      });
  };



  useEffect(() => {
    const fetchAmis = async () => {
      try {
        const response = await axios.get('http://localhost:3000/friends', { withCredentials: true });
        if (response.data && Array.isArray(response.data)) {
          setFriends(response.data);
          console.log("mes amis :",response.data);

        } else {
          console.error('Les données reçues ne sont pas valides', response.data);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchAmis();
  }, []);

  const toggleDeleteButtons = () => {
    setShowDeleteButtons(!showDeleteButtons);
  };

  return (
    <div>
      <div className="list-container friends-list">
        <div className="friends-list-header">
          <h4>Liste d’amis</h4>
          <button className="toggle-delete" onClick={toggleDeleteButtons}>
            {showDeleteButtons ? 'Annuler' : 'Gérer'}
          </button>
        </div>
        <ul>
          {friends.map((friend, index) => (
            <li key={index}>
              {friend.Pseudo}
              {showDeleteButtons ? (
                <FaTrashAlt
                  className="icon delete"
                  onClick={() => handleDeleteClick(friend.Pseudo)}
                />
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>
        {error && <p className="error">{error.message}</p>}
      </div>
    </div>
  );
}

export default FriendsList;
