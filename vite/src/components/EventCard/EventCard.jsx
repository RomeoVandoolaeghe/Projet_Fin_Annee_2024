import React from 'react';
import './EventCard.css';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h3>{event.Titre_Sortie}</h3>
      <p>Date: {new Date(event.Date_Sortie).toLocaleDateString()}</p>
      <p>Durée: {event.Duree} minutes</p>
      <p>{event.Description_Sortie}</p>
      <p>Lieu: {event.Lieu}</p>
    </div>
  );
}

export default EventCard;
