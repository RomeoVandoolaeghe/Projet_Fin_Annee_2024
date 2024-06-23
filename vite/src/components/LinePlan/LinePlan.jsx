import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScrollReveal from 'scrollreveal';
import './LinePlan.css';

const LinePlan = () => {
  const [datas, setDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [sortType, setSortType] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/sorties', { withCredentials: true });
        setDatas(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des sorties:', error);
      }
    };

    fetchData();

    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '20px',
      duration: 500,
      delay: 100,
      reset: true,
    });
    sr.reveal('.reveal');
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterLocation(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const filteredData = datas
    .filter(data => 
      data.Description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterLocation ? data.Lieu === filterLocation : true)
    )
    .sort((a, b) => {
      if (sortType === 'date') {
        return new Date(a.Date_Sortie) - new Date(b.Date_Sortie);
      } else if (sortType === 'titre') {
        return a.Description.localeCompare(b.Description);
      } else if (sortType === 'heure') {
        return a.Heure.localeCompare(b.Heure);
      }
      return 0;
    });

  return (
    <div>
      <div className="filters">
        <input 
          type="text" 
          placeholder="Rechercher une activité..." 
          value={searchTerm} 
          onChange={handleSearchChange} 
        />
        <select value={filterLocation} onChange={handleFilterChange}>
          <option value="">Tous les lieux</option>
          <option value="Paris">Paris</option>
        </select>
        <select value={sortType} onChange={handleSortChange}>
          <option value="">Trier par</option>
          <option value="date">Date</option>
          <option value="titre">Titre</option>
          <option value="heure">Heure</option>
        </select>
      </div>
      <div className="reveal">
        <div className="val">
          <span>Date</span>
          <span>Heure</span>
          <span>Titre</span>
          <span>Participant</span>
          <span>Lieu</span>
        </div>
        {filteredData.map((data, index) => (
          <div key={index} className="item">
            <span>{new Date(data.Date_Sortie).toLocaleDateString()}</span>
            <span>{new Date(data.Date_Sortie).toLocaleTimeString()}</span>
            <span>{data.Description}</span>
            <span>{data.Nb_personnes}</span>
            <span>{data.Lieu}</span>
          </div>
        ))}
      </div>
      {selectedEvent && (
        <EventDetails 
          event={selectedEvent} 
          isOpen={!!selectedEvent} 
          onRequestClose={closeModal} 
        />
      )}
    </div>
  );
}

export default LinePlan;

