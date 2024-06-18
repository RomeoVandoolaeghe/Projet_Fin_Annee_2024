import React, { useState } from 'react';
import { FaCheck, FaTimes, FaTrashAlt } from 'react-icons/fa';
import './FriendsList.css';
import { Link } from 'react-router-dom';

const friends = [
  { name: 'Ragnar Lodbrok'},
  { name: 'Harald Hardrada'},
  { name: 'Thorfinn Karlsefni' },
  { name: 'Thors Karlsefni'},
  { name: 'Leif Erikson' },
  { name: 'Thorkell Le Grand' },
  { name: 'Knut Le Grand'},
  { name: 'Kjetill Eriksson' },
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
      <div className="list-container invitations-list">
        <h4>Invitations</h4>
        <ul>
          {invitations.map((invitation, index) => (
            <li key={index}>
              {invitation.name}
              <div className="invitation-buttons">
                <FaCheck className="icon accept" />
                <FaTimes className="icon reject" />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="list-container friends-list">
        <div className="friends-list-header">
          <h4>Liste d’amis</h4>
          <button className="toggle-delete" onClick={toggleDeleteButtons}>
            <Link to="/AddFriend" className='button_2'>Gérer des amis</Link>
          </button>
        </div>
        <ul>
          {friends.map((friend, index) => (
            <li key={index}>
              {friend.name}
              {showDeleteButtons ? (
                <FaTrashAlt className="icon delete" />
              ) : (
                <span className={`status`}></span>
              )}
            </li>
          ))}
        </ul>
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
