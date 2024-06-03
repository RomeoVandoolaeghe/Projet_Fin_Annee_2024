import React from 'react';
import './Availability.css';

const initialAvailability = [
  { day: 'Lundi', start: '09:00', end: '18:00' },
  { day: 'Mardi', start: '09:00', end: '18:00' },
  { day: 'Mercredi', start: '09:00', end: '18:00' },
  { day: 'Jeudi', start: '09:00', end: '18:00' },
  { day: 'Vendredi', start: '09:00', end: '18:00' },
];

const Availability = () => {
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
          {initialAvailability.map((item, index) => (
            <tr key={index}>
              <td>{item.day}</td>
              <td>
                <span>{item.start}</span>
              </td>
              <td>
                <span>{item.end}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Availability;
