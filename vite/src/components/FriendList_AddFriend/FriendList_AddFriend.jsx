import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaTrashAlt } from 'react-icons/fa';
import './FriendList_AddFriend.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);

  useEffect(() => {
    const fetchAmis = async () => {
      try {
        const response = await axios.get('http://localhost:3000/friends', { withCredentials: true });
        if (response.data && Array.isArray(response.data)) {
          setFriends(response.data);
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
                <FaTrashAlt className="icon delete" />
              ) : ("")}
            </li>
          ))}
        </ul>
        {error && <p className="error">{error.message}</p>}
      </div>
    </div>
  );
}

export default FriendsList;
