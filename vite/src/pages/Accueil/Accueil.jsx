import React from 'react';
import UpComingEvents from '../../components/UpComingEvents/UpComingEvents';
import axios from 'axios'



function Home ({ name }) {

  axios.post("http://localhost:3000/acces", { withCredentials: true })
      .then(response => {
        console.log('Réponse de la requête POST:', response);
        if (response.status === 401) {
          window.location.href = 'http://localhost:5173/';
        }
      })
      .catch(error => {
        console.error('Erreur lors de la requête POST:', error);
});

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