import './InputHour.css';
import React from 'react';

function InputHour({ title }) {
    return (
        <div className='input-hour-box'>
            <p className='input-hour-label'>{title} :</p>
            <input type="time" className='input-hour-field' />
        </div>
    );
}

export default InputHour;
