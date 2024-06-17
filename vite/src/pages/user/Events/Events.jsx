import { Link } from 'react-router-dom';
import LineHead from '../../../components/LineHead/LineHead.jsx';
import LinePlan from '../../../components/LinePlan/LinePlan.jsx';
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
      <div className='header'>  
        <h2>Planning</h2>
      </div>
      <ul className='ul'>
        <div className='div'>
        <li className="reveal"><Link to="/CreateOutput" className='link'>Creer une sortie</Link></li>
          <li className="reveal"><Link to="/Events" className='link'>Table</Link></li>
        </div>
      </ul>
      <div className='box'>
        <LineHead/>
      <LinePlan/>
      </div>
    </>
  );
}

export default Events;
