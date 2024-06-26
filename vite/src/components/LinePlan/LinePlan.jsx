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
      } catch (error) {
        console.error('Erreur lors de la récupération des sorties:', error);
      }
    };

    fetchData();

    // const sr = ScrollReveal({
    //   origin: 'bottom',
    //   distance: '20px',
    //   duration: 500,
    //   delay: 100,
    //   reset: true,
    // });
    // sr.reveal('.reveal');
  }, []);


  // Filtrer et trier les données selon les critères de recherche, filtre et tri
  
  return (
    <div>

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
        {datas.map((data, index) => (
          <div key={index} className="val" id="events">
            <span>{new Date(data.Date_Sortie).toLocaleDateString()}</span>
            <span>{new Date(data.Date_Sortie).toLocaleTimeString()}</span>
            <span>{data.Titre_Sortie}</span>
            <span>{data.nb_personnes}</span>
            <span>{data.ID_Creator}</span>
            <span>{data.Lieu}</span>
            <span>
              <button id='yes'>YES</button>
              <button id='no'>NO</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LinePlan;