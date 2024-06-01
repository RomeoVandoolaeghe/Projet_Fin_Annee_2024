import React, { useState } from 'react';
import './History.css';

const initialHistory = [
  { date: '2023-05-20', activity: "Aller au parc d'attraction", duration: "1 jour", location: "Disneyland Paris" },
  { date: '2023-06-15', activity: "Randonnée en montagne", duration: "1 jour", location: "Chamonix" },
  { date: '2023-07-10', activity: "Visite du musée", duration: "1 jour", location: "Louvre" },
];

const History = ({ isEditMode }) => {
  const [history, setHistory] = useState(initialHistory);

  const handleInputChange = (index, field, value) => {
    const newHistory = [...history];
    newHistory[index][field] = value;
    setHistory(newHistory);
  };

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
              <td>
                {isEditMode ? (
                  <input
                    type="date"
                    value={item.date}
                    onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                  />
                ) : (
                  item.date
                )}
              </td>
              <td>
                {isEditMode ? (
                  <input
                    type="text"
                    value={item.activity}
                    onChange={(e) => handleInputChange(index, 'activity', e.target.value)}
                  />
                ) : (
                  item.activity
                )}
              </td>
              <td>
                {isEditMode ? (
                  <input
                    type="text"
                    value={item.duration}
                    onChange={(e) => handleInputChange(index, 'duration', e.target.value)}
                  />
                ) : (
                  item.duration
                )}
              </td>
              <td>
                {isEditMode ? (
                  <input
                    type="text"
                    value={item.location}
                    onChange={(e) => handleInputChange(index, 'location', e.target.value)}
                  />
                ) : (
                  item.location
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
