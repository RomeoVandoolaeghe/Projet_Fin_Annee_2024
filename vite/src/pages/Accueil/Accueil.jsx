import React from 'react';
import HeaderHome from '../../components/HeaderHome/HeaderHome';
import UpComingEvents from '../../components/UpComingEvents/UpComingEvents';

function Home () {
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
  return ( 
    <div className="home">
      <HeaderHome name="Pascal" />
      <UpComingEvents events={events} />
    </div>

  );
}


export default Home;
