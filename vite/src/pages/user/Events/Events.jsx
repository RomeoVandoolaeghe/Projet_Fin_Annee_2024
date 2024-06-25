import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import LinePlan from '../../../components/LinePlan/LinePlan';
import './Events.css';
import Navbar from '../../../components/Navbar/Navbar';


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
      <Navbar />
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
