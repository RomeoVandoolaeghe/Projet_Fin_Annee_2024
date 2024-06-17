import React, { useState } from 'react';
import { FaCheck, FaTimes, FaTrashAlt } from 'react-icons/fa';
import './FriendList_AddFriend.css';
import { Link } from 'react-router-dom';

const friends = [

];

const invitations = [
  { name: 'Bjorn Ironside' },
  { name: 'Ivar the Boneless' },
];

const group = [
  { name: 'SEIRIN' },
  { name: 'JABBERWORKS' },
  { name: 'TOHO' },
];

const FriendsList = () => {
  const [groups, setGroups] = useState(group);
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);

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
              {friend.name}
              {showDeleteButtons ? (
                <FaTrashAlt className="icon delete" />
              ) : ("")
               
              }
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default FriendsList;
