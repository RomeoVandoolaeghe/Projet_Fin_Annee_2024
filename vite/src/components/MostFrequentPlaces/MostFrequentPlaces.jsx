import React from 'react';
import './MostFrequentPlaces.css';

const MostFrequentPlaces = ({ places }) => (
  <div className="stats-section">
    <h4>Lieux les Plus Fréquentés</h4>
    <ul className='MostFrequentPlaces'>
      {places.map((place, index) => (
        <li key={index}> 
          <img src={place.img} alt={place.name} />
          <div className="overlay">
            <p> <strong> {place.name} </strong></p>
            <p> {place.times} <br /> visites </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default MostFrequentPlaces;