import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScrollReveal from 'scrollreveal';
import './LinePlan.css';
import { FaTicketAlt } from 'react-icons/fa';

const LinePlan = () => {
  const [datas, setDatas] = useState([]); // État pour stocker les données des sorties
  const [searchTerm, setSearchTerm] = useState(''); // État pour le terme de recherche
  const [filterLocation, setFilterLocation] = useState(''); // État pour le filtre de lieu
  const [sortType, setSortType] = useState(''); // État pour le type de tri
  const [selectedEvent, setSelectedEvent] = useState(null); // État pour l'événement sélectionné
  const [locations, setLocations] = useState([]); // État pour stocker les lieux uniques

  // useEffect pour récupérer les données des sorties et initialiser ScrollReveal
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/sorties', { withCredentials: true });
        setDatas(response.data);
        console.log("sorties", response.data)
        
        // Récupérer les lieux uniques pour les options de filtre
        const uniqueLocations = [...new Set(response.data.map(data => data.Lieu))];
        setLocations(uniqueLocations);
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

  // Fonction pour gérer les changements du champ de recherche
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Fonction pour gérer les changements du filtre de lieu
  const handleFilterChange = (e) => {
    setFilterLocation(e.target.value);
  };

  // Fonction pour gérer les changements du type de tri
  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };
  

  // Filtrer et trier les données selon les critères de recherche, filtre et tri
  const filteredData = datas
    .filter(data => 
      data.Description_Sortie.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterLocation ? data.Lieu === filterLocation : true)
    )
    .sort((a, b) => {
      if (sortType === 'date') {
        return new Date(a.Date_Sortie) - new Date(b.Date_Sortie);
      } else if (sortType === 'titre') {
        return a.Description_Sortie.localeCompare(b.Description_Sortie);
      } else if (sortType === 'heure') {
        return new Date(a.Date_Sortie).getTime() - new Date(b.Date_Sortie).getTime(); // Trier par heure
      } else if (sortType === 'lieu') {
        return a.Lieu.localeCompare(b.Lieu);
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
          {locations.map((location, index) => (
            <option key={index} value={location}>{location}</option>
          ))}
        </select>
        <select value={sortType} onChange={handleSortChange}>
          <option value="">Trier par</option>
          <option value="date">Date</option>
          <option value="titre">Titre</option>
          <option value="heure">Heure</option>
          <option value="lieu">Lieu</option>
        </select>
      </div>
      <div className="reveal">
        <div className="val">
          <span>Date</span>
          <span>Heure</span>
          <span>Titre</span>
          <span>Participants</span>
          <span>Créateur</span>
          <span>Lieu</span>
          <span>Invitation</span>
        </div>
        {filteredData.map((data, index) => (
          <div key={index} className="val" id="events">
            <span>{new Date(data.Date_Sortie).toLocaleDateString()}</span>
            <span>{new Date(data.Date_Sortie).toLocaleTimeString()}</span>
            <span>{data.Titre_Sortie}</span>
            <span>lol</span>
            <span>creator</span>
            <span>{data.Lieu}</span>
            <span>
              <button id='yes'>YES</button>
              <button id='no'>NO</button>
            </span>
          </div>
        ))}
      </div>
      {/* {selectedEvent && (
        <EventDetails 
          event={selectedEvent} 
          isOpen={!!selectedEvent} 
          onRequestClose={closeModal} 
        />
      )} */}
    </div>
  );
}

export default LinePlan;