import React from 'react';
import './EventCard.css';

function EventCard({ event }) {
  return (
    <div className="event-card">
      <div className="event-title-location">
        <span className="event-title">{event.title}</span>
        <span className="event-location">{event.location}</span>
      </div>
      <div className="event-time">{event.time}</div>
    </div>
  );
}

export default EventCard;
