import React, { useState, useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import './LinePlan.css';

const LinePlan = () => {
  const initialData = [
    {
      date: "30/01/1999",
      heure: "15",
      titre: "Visite de la tour Eiffel",
      nb_participant: "50",
      lieu: "Paris",
    },
    // Ajoutez d'autres données...
  ];

  const [datas, setDatas] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [sortType, setSortType] = useState('');

  useEffect(() => {
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

  const filteredData = datas
    .filter(data => 
      data.titre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterLocation ? data.lieu === filterLocation : true)
    )
    .sort((a, b) => {
      if (sortType === 'date') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortType === 'titre') {
        return a.titre.localeCompare(b.titre);
      } else if (sortType === 'heure') {
        return a.heure.localeCompare(b.heure);
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
          {/* Ajoutez d'autres options de lieu ici */}
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
            <span>{data.date}</span>
            <span>{data.heure}</span>
            <span>{data.titre}</span>
            <span>{data.nb_participant}</span>
            <span>{data.lieu}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LinePlan;
