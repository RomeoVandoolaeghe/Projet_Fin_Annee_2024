import React from 'react';
import EventCard from '../../components/EventCard/EventCard';
import './UpComingEvents.css';

function UpComingEvents({ events }) {
  return (
    <div className="upcoming-events">
      <h3>À venir</h3>
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
}

export default UpComingEvents;