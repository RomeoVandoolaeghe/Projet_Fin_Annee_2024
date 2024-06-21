import React from 'react';
import EventCard from '../../components/EventCard/EventCard';
import './UpComingEvents.css';

function UpComingEvents({ events }) {
  return (
    <div className="upcoming-events">
      <h4>À venir</h4>
      {events.length > 0 ? (
        events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))
      ) : (
        <div className="no-events">Aucune sortie à venir</div>
      )}
    </div>
  );
}

export default UpComingEvents;
