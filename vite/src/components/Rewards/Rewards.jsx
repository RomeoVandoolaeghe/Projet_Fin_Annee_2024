import React from 'react';
import './Rewards.css';

const Rewards = ({ badges }) => (
  <div className="stats-section">
    <h3>Récompenses</h3>
    <ul>
      {badges.map((badge, index) => (
        <li key={index}>{badge}</li>
      ))}
    </ul>
  </div>
);

export default Rewards;
