import React from 'react';
import './MostFrequentFriends.css';

const MostFrequentFriends = ({ friends }) => (
  <div className="stats-section">
<<<<<<< HEAD
    <h4>Amis les Plus Fréquentés</h4>
=======
    <h3>Amis les Plus Fréquentés</h3>
>>>>>>> origin/test_lauric
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
