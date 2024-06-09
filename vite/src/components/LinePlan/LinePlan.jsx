import "./LinePlan.css";
import ScrollReveal from 'scrollreveal';
import React, { useEffect } from 'react';

function LinePlan() {
  const datas = [
    {
      date: "30/01/1999",
      heure: "15",
      titre: "Visite de la tour Eiffel",
      nb_participant: "50",
      lieu: "Paris",
    },
    {
      date: "30/01/1999",
      heure: "15",
      titre: "Visite de la tour Eiffel",
      nb_participant: "50",
      lieu: "Paris",
    },
    {
      date: "30/01/1999",
      heure: "15",
      titre: "Visite de la tour Eiffel",
      nb_participant: "50",
      lieu: "Paris",
    },
    {
      date: "30/01/1999",
      heure: "15",
      titre: "Visite de la tour Eiffel",
      nb_participant: "50",
      lieu: "Paris",
    },
    {
      date: "30/01/1999",
      heure: "15",
      titre: "Visite de la tour Eiffel",
      nb_participant: "50",
      lieu: "Paris",
    },
    {
      date: "30/01/1999",
      heure: "15",
      titre: "Visite de la tour Eiffel",
      nb_participant: "50",
      lieu: "Paris",
    },
    {
      date: "30/01/1999",
      heure: "15",
      titre: "Visite de la tour Eiffel",
      nb_participant: "50",
      lieu: "Paris",
    },
    {
      date: "30/01/1999",
      heure: "15",
      titre: "Visite de la tour Eiffel",
      nb_participant: "50",
      lieu: "Paris",
    },
    // ...autres données...
  ];

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
    <div className="reveal">
      {datas.map((data, index) => (
        <div key={index} className="item">
          <span>{data.date}</span>
          <span>{data.heure}</span>
          <span>{data.titre}</span>
          <span>{data.nb_participant}</span>
          <span>{data.lieu}</span>
        </div>
      ))}
    </div>
  );
}

export default LinePlan;
