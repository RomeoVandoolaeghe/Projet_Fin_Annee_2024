import React from 'react';
import './ParticipationStats.css';

const ParticipationStats = ({ totalEvents, organizedEvents, participationRate }) => (
  <div className="stats-section">
    <h4>Statistiques de Participation</h4>
    <div className="stats-grid">
      <div className="stat-item">
        <p>Total de sorties :</p>
        <p>{totalEvents}</p>
      </div>
      <div className="stat-item">
        <p>Événements organisés :</p>
        <p>{organizedEvents}</p>
      </div>
      <div className="stat-item">
        <p>Taux de participation : </p>
        <p> {participationRate}%</p>
      </div>
    </div>
  </div>
);

export default ParticipationStats;
