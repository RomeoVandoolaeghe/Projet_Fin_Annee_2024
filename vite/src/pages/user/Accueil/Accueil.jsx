import React from 'react';
import UpComingEvents from '../../../components/UpComingEvents/UpComingEvents';
/* import NotificationCard from '../../../components/Notification/Notification'; */
import axios from 'axios'
import './Accueil.css';
import Navbar from '../../../components/Navbar/Navbar';


function Home() {

  axios.get("http://localhost:3000/get_pseudo", { withCredentials: true })
    .then(response => {
      console.log('Réponse de la requête POST:', response);
      document.getElementById('pseudo').innerHTML = "Hello " + response.data.Pseudo + " !";

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
      title: "Louis Vuitton",
      location: "Paris",
      time: "13:30 - 17:30",
    },
  ];

  return (
    <>
      <Navbar />
      <div className='header'>
        <h3 id="pseudo">Hello HUGO !!!</h3>
      </div>
      <div className="home">
        <h2>Centre de notification</h2>
        <UpComingEvents events={events} />
      {/* <NotificationCard notification={{ title: "Nouveau message", group: "Groupe 1", count: 1 }} /> */}
      </div>
    </>

  );
}


export default Home;