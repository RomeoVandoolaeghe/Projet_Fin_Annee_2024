import React from 'react';
import './MostFrequentPlaces.css';

const MostFrequentPlaces = ({ places }) => (
  <div className="stats-section">
<<<<<<< HEAD
    <h4>Lieux les Plus Fréquentés</h4>
=======
    <h3>Lieux les Plus Fréquentés</h3>
>>>>>>> origin/test_lauric
    <ul className='MostFrequentPlaces'>
      {places.map((place, index) => (
        <li key={index}> 
          <img src={place.img} alt={place.name} />
          <p> <strong> {place.name} </strong></p>
          <p> Nombre de visite : {place.times}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default MostFrequentPlaces;