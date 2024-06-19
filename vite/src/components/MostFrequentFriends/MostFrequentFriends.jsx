import React from 'react';
import './MostFrequentFriends.css';

const MostFrequentFriends = ({ friends }) => (
  <div className="stats-section">
    <h4>Amis les Plus Fréquentés</h4>
    <ul>
      {friends.map((friend, index) => (
        <li key={index}> 
          <img src={friend.img} alt={friend.name} />
          <div className="overlay">
            <p><strong>{friend.name}</strong></p>
            <p> {friend.times} <br /> sorties </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default MostFrequentFriends;
