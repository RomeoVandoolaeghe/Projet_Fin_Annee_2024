import React from 'react';
import './Calendar.css';
import DayColumn from '../DayColumn/DayColumn.jsx';

const Calendar = () => {
    const days = ['10/06', '11/06', '12/06', '13/06', '14/06', '15/06'];
    const hours = [
        '07 h', '08 h', '09 h', '10 h', '11 h', '12 h', 
        '13 h', '14 h', '15 h', '16 h', '17 h', '18 h'
    ];

    return (
        <div className="calendar">
            <div className="hour-column">
                {hours.map((hour, index) => (
                    <div key={index} className="hour-label">{hour}</div>
                ))}
            </div>
            {days.map((day, index) => (
                <DayColumn key={index} day={day} hours={hours} />
            ))}
        </div>
    );
}

export default Calendar;
