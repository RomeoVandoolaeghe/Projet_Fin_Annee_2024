import React from 'react';
import './MostFrequentFriends.css';

const MostFrequentFriends = ({ friends }) => (
  <div className="stats-section">
    <h3>Amis les Plus Fréquentés</h3>
    <ul>
      {friends.map((friend, index) => (
        <li key={index}>{friend.name} - {friend.times} sorties ensemble</li>
      ))}
    </ul>
  </div>
);

export default MostFrequentFriends;
