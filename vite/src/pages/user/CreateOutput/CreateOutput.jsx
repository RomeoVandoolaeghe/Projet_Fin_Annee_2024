import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import './CreateOutput.css';
import { Link } from 'react-router-dom';

function CreateOutput() {
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
      <div className="container">
        <div className='button-box'>
          <Link to='/Chat' className='button'>
            Retour
          </Link>
        </div>
        <div className='start reveal'>
          <h1>Creer une sortie</h1>
          <div className='space'>
            <div className='input-box'>
              <p className='input-label'>Titre de la sortie :</p>
              <input type="text" className='input-field' />
            </div>
          </div>
          <div>
            <div className='input-box'>
              <p>Description :</p>
              <textarea cols={50} rows={5} />
            </div>
          </div>
          <div className='space'>
            <div className='input-number-box'>
              <p className='input-number-label'>Nombre de participant :</p>
              <input type="number" className='input-number-field' min="0" />
            </div>
          </div>
          <div className='linediv reveal'>
            <div className='input-date-box'>
              <p className='input-date-label'>Date :</p>
              <input type="date" className='input-date-field' />
            </div>
            <div className='input-hour-box'>
              <p className='input-hour-label'>Heure :</p>
              <input type="time" className='input-hour-field' />
            </div>
          </div>
          <div className='linebutton reveal'>
            <Link to='/' className='button'>
              Creer
            </Link>
            <Link to='/' className='button'>
              Annuler
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateOutput;
