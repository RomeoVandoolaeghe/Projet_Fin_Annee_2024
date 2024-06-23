import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './History.css';

const History = () => {
  // États pour stocker l'historique des sorties, le terme de recherche, le filtre de lieu, le type de tri et les couleurs des lieux
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
        setHistory(response.data); // Stocker les données récupérées dans l'état history
      } catch (error) {
        console.error('Erreur lors de la récupération des sorties:', error);
      }
    };

    fetchHistory();
  }, []); // Le tableau vide signifie que ce useEffect sera exécuté une seule fois après le premier rendu

  useEffect(() => {
    // Gestion des couleurs dynamiques pour les lieux
    const colors = {};
    history.forEach(item => {
      if (!colors[item.Lieu]) {
        colors[item.Lieu] = getRandomColor(); // Générer une couleur aléatoire pour chaque lieu unique
      }
    });
    setLocationColors(colors); // Stocker les couleurs des lieux dans l'état locationColors
  }, [history]); // Ce useEffect sera exécuté à chaque fois que l'état history change

  // Fonction pour générer une couleur aléatoire
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Gestionnaire pour mettre à jour l'état searchTerm lorsque l'utilisateur tape dans le champ de recherche
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Gestionnaire pour mettre à jour l'état filterLocation lorsque l'utilisateur sélectionne un lieu dans le filtre
  const handleFilterChange = (e) => {
    setFilterLocation(e.target.value);
  };

  // Gestionnaire pour mettre à jour l'état sortType lorsque l'utilisateur sélectionne un type de tri
  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  // Filtrer et trier les sorties en fonction des critères de recherche, de filtre et de tri
  const filteredHistory = history
    .filter(item => 
      item.Description.toLowerCase().includes(searchTerm.toLowerCase()) && // Filtrer par terme de recherche
      (filterLocation ? item.Lieu === filterLocation : true) // Filtrer par lieu si un lieu est sélectionné
    )
    .sort((a, b) => {
      if (sortType === 'date') {
        return new Date(a.Date_Sortie) - new Date(b.Date_Sortie); // Trier par date
      } else if (sortType === 'activity') {
        return a.Description.localeCompare(b.Description); // Trier par activité
      } else if (sortType === 'duration') {
        return a.Duree - b.Duree; // Trier par durée
      }
      return 0; // Pas de tri si aucun type de tri n'est sélectionné
    });

  // Obtenir la date actuelle
  const currentDate = new Date();

  // Filtrer les sorties passées en comparant la date de sortie à la date actuelle
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
          {/* Extraire les lieux uniques de l'historique pour les options de filtre */}
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
          {/* Afficher les sorties passées */}
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
