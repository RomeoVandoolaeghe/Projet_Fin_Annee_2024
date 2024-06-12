import React,{ useEffect} from 'react';
import ScrollReveal from 'scrollreveal';
import UpComingEvents from '../../components/UpComingEvents/UpComingEvents';

function Home({ name }) {
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
  const events = [
    {
      title: "Palais des Beaux - Arts",
      location: "Lille",
      time: "13:30 - 17:30",
    },
    {
      title: "Palais des Beaux - Arts",
      location: "Lille",
      time: "13:30 - 17:30",
    },
  ];
  
  name = 'Hugo';
    
  return ( 
    <>
    <div className='header reveal'>
      <h2>Hello {name} !!!</h2>
    </div>
      <div className="home reveal">
        <UpComingEvents events={events} />
      </div>
    </>

  );
}


export default Home;