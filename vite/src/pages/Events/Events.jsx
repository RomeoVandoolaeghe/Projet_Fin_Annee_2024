import { Link } from 'react-router-dom';
import LineHead from '../../components/LineHead/LineHead.jsx';
import LinePlan from '../../components/LinePlan/LinePlan.jsx';
import ScrollReveal from 'scrollreveal';
import React, { useEffect } from 'react';
import './Events.css';

function Events() {

  useEffect(() => {
    // Configuration de base de ScrollReveal
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '20px',
      duration: 500,
      delay: 100,
      reset: true, // Animation réapparaît à chaque défilement
    });

    // Appliquer l'animation aux éléments avec la classe "reveal"
    sr.reveal('.reveal');
  }, []);

  return (
    <>
      <h1 className="reveal title">Planning</h1>
      <ul className='ul'>
        <div className='div'>
          <li className="reveal"><Link to="/Calendar" className='link'>Calendrier</Link></li>
          <li className="reveal"><Link to="/Events" className='link'>Table</Link></li>
        </div>
        <li className="reveal"><Link to="/CreateOutput" className='link'>Creer une sortie</Link></li>
      </ul>
      <div className='box'>
        <LineHead/>
      <LinePlan/>
      </div>
    </>
  );
}

export default Events;
