import React from 'react';
import EventCard from '../../components/EventCard/EventCard';
import './UpComingEvents.css';

function UpComingEvents({ events }) {
  return (
    <div className="upcoming-events">
      <h4>À venir</h4>
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
}

export default UpComingEvents;