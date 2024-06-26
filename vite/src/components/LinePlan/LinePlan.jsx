import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LinePlan.css';


const LinePlan = () => {
  const [data_sorties, setData_sorties] = useState([]); // État pour stocker les données des sorties
  const [data_invitations, setData_invit] = useState([]); // État pour stocker les données des invitations
  // useEffect pour récupérer les données des sorties et initialiser ScrollReveal
  useEffect(() => {
    const fetchSorties = async () => {
      try {
        const response = await axios.get('http://localhost:3000/sorties', { withCredentials: true });
        setData_sorties(response.data);

        console.log("sorties", response.data);

      } catch (error) {
        console.error('Erreur lors de la récupération des sorties:', error);
      }
    };

    fetchSorties();

    const fetchInvitations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/invitations', { withCredentials: true });
        setData_invit(response.data);
        console.log("invitations", response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des invitations:', error);
      }
    };

    fetchInvitations();

  }, []);


  const handleAccept = async (id) => {
    try {
      await axios.post('http://localhost:3000/accepter_invitation', { ID_Sortie: data_invitations[0].ID_Sortie }, { withCredentials: true });
      console.log('Invitation acceptée');
      alert('Invitation acceptée');
      location.reload();
    } catch (error) {
      console.error('Erreur lors de l\'acceptation de l\'invitation:', error);
    }
  };


console.log("les invitations: ",data_invitations)

  return (
    <div>

      <div className="reveal">
        <div className="val">
          <span>Date</span>
          <span>Heure</span>
          <span>Titre</span>
          <span>Participants</span>
          <span>Créateur</span>
          <span>Lieu</span>
        </div>
        {data_sorties.map((data, index) => (
          <div key={index} className="val" id="events">
            <span>{new Date(data.Date_Sortie).toLocaleDateString()}</span>
            <span>{new Date(data.Date_Sortie).toLocaleTimeString()}</span>
            <span>{data.Titre_Sortie}</span>
            <span>{data.nb_personnes}</span>
            <span>{data.ID_Creator}</span>
            <span>{data.Lieu}</span>
          </div>
        ))}
      </div>



      <div className='header'>
        <h2>Invitations</h2>
      </div>

      <div className="reveal">
        <div className="val">
          <span>Date</span>
          <span>Heure</span>
          <span>Titre</span>
          <span>Participants</span>
          <span>Créateur</span>
          <span>Lieu</span>
          <span>Invitation</span>
        </div>
        {data_invitations.map((data, index) => (
          <div key={index} className="val" id="events">
            <span>{new Date(data.Date_Sortie).toLocaleDateString()}</span>
            <span>{new Date(data.Date_Sortie).toLocaleTimeString()}</span>
            <span>{data.Titre_Sortie}</span>
            <span>{data.nb_personnes}</span>
            <span>{data.ID_Creator}</span>
            <span>{data.Lieu}</span>
            <span>
              <button title="Accepter" onClick={() => handleAccept(data.ID_Sortie)}>YES</button>
              <button title="Refuser" onClick={() => handleRefuse(data.ID_Sortie)}>NO</button>
            </span>
          </div>
        ))}
      </div>


    </div>
  );
}

export default LinePlan;