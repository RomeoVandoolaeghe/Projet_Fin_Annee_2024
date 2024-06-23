import React, { useState, useEffect } from 'react';
import EventCard from '../../components/EventCard/EventCard';
import './UpComingEvents.css';
import axios from 'axios';

function UpComingEvents() {
  // Déclare l'état local "events" pour stocker la liste des événements
  const [events, setEvents] = useState([]);

  // Utilise useEffect pour exécuter une fonction lors du montage du composant
  useEffect(() => {
    // Fonction asynchrone pour récupérer les événements depuis l'API
    const fetchEvents = async () => {
      try {
        // Envoie une requête GET à l'API pour récupérer les sorties
        const response = await axios.get('http://localhost:3000/sorties', { withCredentials: true });
        // Filtre les événements pour ne garder que ceux à venir
        const upcomingEvents = filterUpcomingEvents(response.data);
        // Met à jour l'état "events" avec les événements à venir
        setEvents(upcomingEvents);
      } catch (error) {
        // En cas d'erreur, affiche un message d'erreur dans la console
        console.error('Erreur lors de la récupération des sorties:', error);
      }
    };

    // Appelle la fonction pour récupérer les événements
    fetchEvents();
  }, []);

  // Fonction pour filtrer les événements à venir
  const filterUpcomingEvents = (events) => {
    // Récupère la date actuelle
    const currentDate = new Date();
    // Filtre les événements dont la date est égale ou postérieure à la date actuelle
    return events.filter(event => new Date(event.Date_Sortie) >= currentDate);
  };

  return (
    <div className="upcoming-events">
      <h4>À venir</h4>
      {events.length > 0 ? (
        // Si des événements sont présents, les affiche en utilisant le composant EventCard
        events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))
      ) : (
        // Si aucun événement n'est présent, affiche un message indiquant qu'il n'y a aucune sortie à venir
        <div className="no-events">Aucune sortie à venir</div>
      )}
    </div>
  );
}

export default UpComingEvents;
