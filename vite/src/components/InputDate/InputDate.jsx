import './InputDate.css';
import React from 'react';

function InputDate({ title }) {
    return (
      <div className='input-date-box'>
            <p className='input-date-label'>{title} :</p>
            <input type="date" className='input-date-field' />
        </div>  
    );
}

export default InputDate;
