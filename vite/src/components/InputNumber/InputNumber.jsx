import './InputNumber.css';
import React from 'react';

function InputNumber({ title }) {
    return (
      <div className='input-number-box'>
            <p className='input-number-label'>{title} :</p>
            <input type="number" className='input-number-field' min="0" />
        </div>  
    );
}

export default InputNumber;
