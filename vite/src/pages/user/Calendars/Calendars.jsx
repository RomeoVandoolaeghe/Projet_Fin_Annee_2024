import React from 'react';
import Calendar from '../../../components/Calendar/Calendar.jsx';
import Button from '../../../components/Button/Button.jsx';

function Calendars() {
  return (
    <div className="App">
      <div className="Button-box" >
        <Button title="Retour" className="Button" to="/Events"/>
      </div>
      <Calendar />
    </div>
  );
}

export default Calendars;
