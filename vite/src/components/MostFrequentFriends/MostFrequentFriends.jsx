import React from 'react';
import './MostFrequentFriends.css';

const MostFrequentFriends = ({ friends }) => (
  <div className="stats-section">
    <h3>Amis les Plus Fréquentés</h3>
    <ul>
      {friends.map((friend, index) => (
        <li key={index}> 
          <img src={friend.img} alt={friend.name} />
          <p> <strong> {friend.name} </strong></p>
          <p>Sortie en commun : {friend.times}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default MostFrequentFriends;
