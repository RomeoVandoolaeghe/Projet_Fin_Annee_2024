import React, { useState } from 'react';
import './History.css';

const initialHistory = [
  { date: '2023-05-20', activity: "Aller au parc d'attraction", duration: "1 jour", location: "Disneyland Paris" },
];

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
              <td>{item.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
