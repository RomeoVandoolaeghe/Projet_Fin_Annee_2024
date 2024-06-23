import React from 'react';
import './EventCard.css';

function EventCard({ event }) {
  return (
    <div className="event-card">
      <div className="event-title-location">
        <span className="event-title">{event.Titre}</span>
        <span className="event-location">{event.Lieu}</span>
      </div>
      <div className="event-time">{new Date(event.Date_Sortie).toLocaleString()}</div>
      <div className="event-description">{event.Description}</div>
      <div className="event-participants">Participants: {event.Nb_personnes}</div>
    </div>
  );
}

export default EventCard;
