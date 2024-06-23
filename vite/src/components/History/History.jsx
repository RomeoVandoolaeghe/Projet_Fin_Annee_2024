import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './History.css';

const History = () => {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [sortType, setSortType] = useState('');
  const [locationColors, setLocationColors] = useState({});

  useEffect(() => {
    // Requête pour récupérer l'historique des sorties depuis l'API
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:3000/sorties', { withCredentials: true });
        setHistory(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des sorties:', error);
      }
    };

    fetchHistory();
  }, []);

  useEffect(() => {
    // Gestion des couleurs dynamiques pour les lieux
    const colors = {};
    history.forEach(item => {
      if (!colors[item.Lieu]) {
        colors[item.Lieu] = getRandomColor();
      }
    });
    setLocationColors(colors);
  }, [history]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

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
      item.Description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterLocation ? item.Lieu === filterLocation : true)
    )
    .sort((a, b) => {
      if (sortType === 'date') {
        return new Date(a.Date_Sortie) - new Date(b.Date_Sortie);
      } else if (sortType === 'activity') {
        return a.Description.localeCompare(b.Description);
      } else if (sortType === 'duration') {
        return a.Duree - b.Duree;
      }
      return 0;
    });

  const currentDate = new Date();

  const pastHistory = filteredHistory.filter(item => new Date(item.Date_Sortie) < currentDate);

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
          {[...new Set(history.map(item => item.Lieu))].map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
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
          {pastHistory.map((item, index) => (
            <tr key={index}>
              <td>{new Date(item.Date_Sortie).toLocaleDateString()}</td>
              <td>{item.Description}</td>
              <td>{item.Duree}</td>
              <td><span className='location' style={{ backgroundColor: locationColors[item.Lieu] || '#ffffff' }}>{item.Lieu}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
