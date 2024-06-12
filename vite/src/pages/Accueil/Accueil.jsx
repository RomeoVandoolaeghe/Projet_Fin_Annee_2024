import React from 'react';
import UpComingEvents from '../../components/UpComingEvents/UpComingEvents';

function Home ({ name }) {
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
    <div className='header'>
      <h2>Hello {name} !!!</h2>
    </div>
      <div className="home">
        <UpComingEvents events={events} />
      </div>
    </>

  );
}


export default Home;