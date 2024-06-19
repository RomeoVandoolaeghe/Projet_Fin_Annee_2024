import React, { useEffect } from 'react';
import './LineHead.css';
import ScrollReveal from 'scrollreveal';

function LineHead() {
  const list = [
    {
      date: "Date",
      heure: "Heure",
      titre: "Titre",
      nb_participant: "Participant",
      lieu: "Lieu",
    },
  ];

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
    <div className="reveal">
      {list.map((item, index) => (
        <div key={index} className="val">
          <span>{item.date}</span>
          <span>{item.heure}</span>
          <span>{item.titre}</span>
          <span>{item.nb_participant}</span>
          <span>{item.lieu}</span>
        </div>
      ))}
    </div>
  );
}

export default LineHead;
