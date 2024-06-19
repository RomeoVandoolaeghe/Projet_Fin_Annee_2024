import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import LineHead from '../../../components/LineHead/LineHead';
import LinePlan from '../../../components/LinePlan/LinePlan';
import './Events.css';

function Events() {

  useEffect(() => {
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '20px',
      duration: 500,
      delay: 100,
      reset: true,
    });
    sr.reveal('.reveal');
  }, []);

  return (
    <>
      <div className='header'>  
        <h2>Planning</h2>
      </div>
      <div className='box'>
        <LinePlan />
      </div>
    </>
  );
}

export default Events;
