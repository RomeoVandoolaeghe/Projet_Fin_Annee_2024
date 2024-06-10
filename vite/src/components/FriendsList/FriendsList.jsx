import React, { useState, useEffect } from 'react';
import './FriendsList.css';
import { Link } from 'react-router-dom';

const friends = [
  { name: 'Ragnar Lodbrok', status: 'online' },
  { name: 'Harald Hardrada', status: 'offline' },
  { name: 'Thorfinn Karlsefni', status: 'online' },
  { name: 'Thors Karlsefni', status: 'online' },
  { name: 'Leif Erikson', status: 'online' },
  { name: 'Thorkell Le Grand', status: 'online' },
  { name: 'Knut Le Grand', status: 'offline' },
  { name: 'Kjetill Eriksson', status: 'online' },
];

const group = [
  { name: 'SEIRIN' },
  { name: 'JABBERWORKS' },
  { name: 'TOHO' },
];

const FriendsList = () => {
  const [groups, setGroups] = useState(group);

  return (
    <div>
      <div className="list-container friends-list">
        <h4>Liste d’amis</h4>
        <ul>
          {friends.map((friend, index) => (
            <li key={index} className={friend.status}>
              {friend.name}
              <span className={`status ${friend.status === 'online' ? 'green' : 'red'}`}></span>
            </li>
          ))}
        </ul>
        <button><Link to="/AddFriend">Ajouter un amis</Link></button>
        <h4>Mes groupes</h4>
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