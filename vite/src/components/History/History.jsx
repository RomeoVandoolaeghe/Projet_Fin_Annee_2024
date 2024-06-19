import React, { useState } from 'react';
import './History.css';

const initialHistory = [
  { date: '2023-05-20', activity: "Aller au parc d'attraction", duration: "1 jour", location: "Disneyland Paris" },
  { date: '2023-06-15', activity: "Aller à la plage", duration: "1 jour", location: "Nice" },
  { date: '2023-07-01', activity: "Visiter un musée", duration: "1/2 jour", location: "Louvre, Paris" },
  { date: '2023-08-05', activity: "Faire du ski", duration: "2 jours", location: "Alpes" },
  { date: '2023-09-10', activity: "Randonnée en montagne", duration: "1 jour", location: "Pyrénées" },
];

const locationColors = {
  "Disneyland Paris": "#ffcccc",
  "Nice": "#ccffcc",
  "Louvre, Paris": "#ccccff",
  "Alpes": "#ffccff",
  "Pyrénées": "#ccffff"
};

const History = () => {
  const [history] = useState(initialHistory);

  return (
    <div className="history">
      <h4>Historique des sorties</h4>
      <table className="history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Activité</th>
            <th>Durée</th>
            <th>Lieu</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.activity}</td>
              <td>{item.duration}</td>
              <td><span className='location' style={{ backgroundColor: locationColors[item.location] || '#ffffff' }}>{item.location}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
