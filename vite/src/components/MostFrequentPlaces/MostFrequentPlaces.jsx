import React from 'react';
import './MostFrequentPlaces.css';

const MostFrequentPlaces = ({ places }) => (
  <div className="stats-section">
    <h3>Lieux les Plus Fréquentés</h3>
    <ul>
      {places.map((place, index) => (
        <li key={index}>{place.name} - {place.times} visites</li>
      ))}
    </ul>
  </div>
);

export default MostFrequentPlaces;
