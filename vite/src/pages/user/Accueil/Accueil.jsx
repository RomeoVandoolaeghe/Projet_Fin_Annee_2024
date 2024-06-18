import React from 'react';
import UpComingEvents from '../../../components/UpComingEvents/UpComingEvents';
import axios from 'axios'



function Home({ name }) {

  axios.get("http://localhost:3000/get_pseudo", { withCredentials: true })
    .then(response => {
      console.log('Réponse de la requête POST:', response);
      document.getElementById('pseudo').innerHTML = "Hello " + response.data.Pseudo;

    })
    .catch(error => {
      console.error('Erreur lors de la requête POST:', error);
    });






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
        <h2 id="pseudo"></h2>
      </div>
      <div className="home">
        <UpComingEvents events={events} />
      </div>
    </>

  );
}


export default Home;