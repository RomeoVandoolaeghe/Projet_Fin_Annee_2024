import React from 'react';
import './CalendarEvent.css';

const CalendarEvent = ({ event }) => {
    const { start, end, title, color } = event;
    return (
        <div className="event" style={{ backgroundColor: color }}>
            <div className="event-time">{start} - {end}</div>
            <div className="event-title">{title}</div>
        </div>
    );
}

export default CalendarEvent;
