import React from 'react';
import './ParticipationStats.css';

const ParticipationStats = ({ totalEvents, organizedEvents, participationRate }) => (
  <div className="stats-section">
    <h3>Statistiques de Participation</h3>
    <p>Total de sorties : {totalEvents}</p>
    <p>Événements organisés : {organizedEvents}</p>
    <p>Taux de participation : {participationRate}%</p>
  </div>
);

export default ParticipationStats;
