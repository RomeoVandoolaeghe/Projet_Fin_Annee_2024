import React, { useState, useEffect } from 'react';
import EventCard from '../../components/EventCard/EventCard';
import './UpComingEvents.css';
import axios from 'axios';

function UpComingEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/sorties', { withCredentials: true });
        const upcomingEvents = filterUpcomingEvents(response.data);
        setEvents(upcomingEvents);
      } catch (error) {
        console.error('Erreur lors de la récupération des sorties:', error);
      }
    };

    fetchEvents();
  }, []);

  const filterUpcomingEvents = (events) => {
    const currentDate = new Date();
    return events.filter(event => new Date(event.Date_Sortie) >= currentDate);
  };

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
