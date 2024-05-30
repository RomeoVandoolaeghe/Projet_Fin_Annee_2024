import React, { useState } from 'react';
import './Availability.css';

const initialAvailability = 'Disponible tous les jours de 9h à 18h';

const Availability = ({ isEditMode }) => {
  const [availability, setAvailability] = useState(initialAvailability);

  const handleInputChange = (e) => {
    setAvailability(e.target.value);
  };

  return (
    <div className="availability">
      <h4>Disponibilités</h4>
      {isEditMode ? (
        <textarea
          value={availability}
          onChange={handleInputChange}
        />
      ) : (
        <p>{availability}</p>
      )}
    </div>
  );
};

export default Availability;
