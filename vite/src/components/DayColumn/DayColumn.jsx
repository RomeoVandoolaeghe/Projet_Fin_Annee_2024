import React from 'react';
import './DayColumn.css';
import Event from '../CalendarEvent/CalendarEvent.jsx';

const DayColumn = ({ day, hours }) => {
    const events = [
        { start: '09:00', end: '12:00', title: 'ISEN A622 Projet Développement Logiciel', color: '#6a1b9a' },
        { start: '13:30', end: '17:00', title: 'ISEN A622 Projet Développement Logiciel', color: '#6a1b9a' },
        { start: '08:00', end: '10:00', title: 'Electronique', color: '#d32f2f' }
    ];

    return (
        <div className="day-column">
            <div className="day-label">{day}</div>
            {hours.map((hour, index) => (
                <div key={index} className="hour-slot">
                    {events.map((event, i) => (
                        <Event key={i} event={event} />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default DayColumn;
