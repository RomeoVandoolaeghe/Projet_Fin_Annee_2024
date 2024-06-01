import React, { useState } from 'react';
import './Availability.css';

const initialAvailability = [
  { day: 'Lundi', start: '09:00', end: '18:00' },
  { day: 'Mardi', start: '09:00', end: '18:00' },
  { day: 'Mercredi', start: '09:00', end: '18:00' },
  { day: 'Jeudi', start: '09:00', end: '18:00' },
  { day: 'Vendredi', start: '09:00', end: '18:00' },
];

const Availability = ({ isEditMode }) => {
  const [availability, setAvailability] = useState(initialAvailability);

  const handleInputChange = (index, field, value) => {
    const newAvailability = [...availability];
    newAvailability[index][field] = value;
    setAvailability(newAvailability);
  };

  return (
    <div className="availability">
      <h4>Disponibilités</h4>
      <table className="availability-table">
        <thead>
          <tr>
            <th>Jour</th>
            <th>Début</th>
            <th>Fin</th>
          </tr>
        </thead>
        <tbody>
          {availability.map((item, index) => (
            <tr key={index}>
              <td>{item.day}</td>
              <td>
                {isEditMode ? (
                  <input
                    type="time"
                    value={item.start}
                    onChange={(e) => handleInputChange(index, 'start', e.target.value)}
                    className="time-input"
                  />
                ) : (
                  <span>{item.start}</span>
                )}
              </td>
              <td>
                {isEditMode ? (
                  <input
                    type="time"
                    value={item.end}
                    onChange={(e) => handleInputChange(index, 'end', e.target.value)}
                    className="time-input"
                  />
                ) : (
                  <span>{item.end}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Availability;
