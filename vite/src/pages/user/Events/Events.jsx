import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import LinePlan from '../../../components/LinePlan/LinePlan';
import './Events.css';
import Navbar from '../../../components/Navbar/Navbar';
import axios from 'axios';


function Events() {

  axios.post("http://localhost:3000/acces", "", { withCredentials: true })
  .then(response => {
    console.log('Réponse de la requête POST:', response);
    if (response.status === 201) {
      window.location.href = 'http://localhost:5173';
      alert('Veuillez vous connecter pour accéder à cette page')
    }


  })
  .catch(error => {
    console.error('Erreur lors de la requête POST:', error);
  });



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
        <h2>Mes sorties</h2>
      </div>
      <div className='box'>
        <LinePlan />
      </div>


    </>
  );
}

export default Events;
