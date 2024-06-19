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
  const [history, setHistory] = useState(initialHistory);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [sortType, setSortType] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterLocation(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  const filteredHistory = history
    .filter(item => 
      item.activity.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterLocation ? item.location === filterLocation : true)
    )
    .sort((a, b) => {
      if (sortType === 'date') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortType === 'activity') {
        return a.activity.localeCompare(b.activity);
      } else if (sortType === 'duration') {
        return a.duration.localeCompare(b.duration);
      }
      return 0;
    });

  return (
    <div className="history">
      <h4>Historique des sorties</h4>
      <div className="filters">
        <input 
          type="text" 
          placeholder="Rechercher une activité..." 
          value={searchTerm} 
          onChange={handleSearchChange} 
        />
        <select value={filterLocation} onChange={handleFilterChange}>
          <option value="">Tous les lieux</option>
          <option value="Disneyland Paris">Disneyland Paris</option>
          <option value="Nice">Nice</option>
          <option value="Louvre, Paris">Louvre, Paris</option>
          <option value="Alpes">Alpes</option>
          <option value="Pyrénées">Pyrénées</option>
        </select>
        <select value={sortType} onChange={handleSortChange}>
          <option value="">Trier par</option>
          <option value="date">Date</option>
          <option value="activity">Activité</option>
          <option value="duration">Durée</option>
        </select>
      </div>
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
          {filteredHistory.map((item, index) => (
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
