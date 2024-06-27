import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LinePlan.css';

const LinePlan = () => {
  const [data_sorties, setData_sorties] = useState([]); // État pour stocker les données des sorties
  const [data_invitations, setData_invit] = useState([]); // État pour stocker les données des invitations
  const [pseudos, setPseudos] = useState({}); // État pour stocker les pseudos des créateurs
  const [dispo, setDispo] = useState([]); // État pour stocker les disponibilités

  useEffect(() => {
    const fetchSorties = async () => {
      try {
        const response = await axios.get('http://localhost:3000/sorties', { withCredentials: true });
        setData_sorties(response.data);
        console.log("sorties", response.data);

        // Récupérer les pseudos des créateurs
        const pseudosMap = {};
        await Promise.all(
          response.data.map(async (sortie) => {
            const pseudo = await handlePseudo(sortie.ID_Creator);
            pseudosMap[sortie.ID_Creator] = pseudo;
          })
        );

        // Mettre à jour l'état des pseudos
        setPseudos(pseudosMap);
      } catch (error) {
        console.error('Erreur lors de la récupération des sorties:', error);
      }
    };

    const fetchInvitations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/invitations', { withCredentials: true });
        setData_invit(response.data);
        console.log("invitations", response.data);

        // Récupérer les pseudos des créateurs
        const pseudosMap = {};
        await Promise.all(
          response.data.map(async (sortie) => {
            const pseudo = await handlePseudo(sortie.ID_Creator);
            pseudosMap[sortie.ID_Creator] = pseudo;
          })
        );

        // Mettre à jour l'état des pseudos
        setPseudos(pseudosMap);
      } catch (error) {
        console.error('Erreur lors de la récupération des invitations:', error);
      }
    };

    const fetchDispo = async () => {
      try {
        const response = await axios.get('http://localhost:3000/recup_dispo', { withCredentials: true });
        // Supposons que response.data est un tableau d'objets avec day, start_time, end_time
        const structuredDispo = response.data.map(dispo => ({
          day: dispo.Jour,
          startTime: dispo.Heure_debut,
          endTime: dispo.Heure_fin,
        }));
        setDispo(structuredDispo);
      } catch (error) {
        console.log("Erreur lors de la requête:", error);
      }
    };


    fetchSorties();
    fetchInvitations();
    fetchDispo();


  }, []);


  const handlePseudo = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/get_pseudo/${id}`, { withCredentials: true });
      console.log("pseudo", response.data);
      return response.data.Pseudo; // Assurez-vous d'accéder à la clé 'Pseudo' ici
    } catch (error) {
      console.error('Erreur lors de la récupération du pseudo:', error);
      return '';
    }
  };

  const handleAccept = async (id, date) => {
    // Fonction pour convertir la date jj/mm/aaaa en objet Date
    function getDayAndTimeInFrench(dateString) {
      const joursDeLaSemaine = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
      const date = new Date(dateString);
      const dayIndex = date.getDay(); // Utilisation de getDay pour obtenir le jour de la semaine en local

      // Récupérer les heures et les minutes en utilisant toLocaleTimeString avec le fuseau horaire français
      const options = { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit', hour12: false };
      const heureDebut = date.toLocaleTimeString('fr-FR', options);

      const jourDeLaSemaine = joursDeLaSemaine[dayIndex];

      return {
        jourDeLaSemaine,
        heureDebut
      };
    }
    // Exemple d'utilisation
    const TIME = getDayAndTimeInFrench(date);
    console.log("jour et heure est :", TIME); // Affiche "mercredi" et l'heure en fuseau horaire français

    console.log("dispo", dispo);

    // Vérifier si le jour et l'heure de début sont dans les disponibilités
    const isAvailable = dispo.some(d => {
      return d.day === TIME.jourDeLaSemaine && TIME.heureDebut >= d.startTime && TIME.heureDebut <= d.endTime;
    });

    



    if (!isAvailable) {
      alert('Vous n\'êtes pas disponible pour cette sortie');
      return;
    }
    else {
      try {
        await axios.post('http://localhost:3000/accepter_invitation', { ID_Sortie: id }, { withCredentials: true });
        console.log('Invitation acceptée');
        alert('Invitation acceptée');
        location.reload();
      } catch (error) {
        console.error('Erreur lors de l\'acceptation de l\'invitation:', error);
      }
    }


  };

  const handleRefuse = async (id) => {
    try {
      await axios.post('http://localhost:3000/refuser_invitation', { ID_Sortie: id }, { withCredentials: true });
      console.log('Invitation refusée');
      alert('Invitation refusée');
      location.reload();
    } catch (error) {
      console.error('Erreur lors du refus de l\'invitation:', error);
    }
  };

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
          <span>Durée en minutes</span>
        </div>
        {data_sorties.map((data, index) => (
          <div key={index} className="val" id="events">
            <span>{new Date(data.Date_Sortie).toLocaleDateString()}</span>
            <span>{new Date(data.Date_Sortie).toLocaleTimeString()}</span>
            <span>{data.Titre_Sortie}</span>
            <span>{data.nb_personnes}</span>
            <span>{pseudos[data.ID_Creator]}</span>
            <span>{data.Lieu}</span>
            <span>{data.Duree}</span>
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
          <span>Durée en minutes</span>
          <span>Invitation</span>
        </div>
        {data_invitations.map((data, index) => (
          <div key={index} className="val" id="events">
            <span>{new Date(data.Date_Sortie).toLocaleDateString()}</span>
            <span>{new Date(data.Date_Sortie).toLocaleTimeString()}</span>
            <span>{data.Titre_Sortie}</span>
            <span>{data.nb_personnes}</span>
            <span>{pseudos[data.ID_Creator]}</span>
            <span>{data.Lieu}</span>
            <span>{data.Duree}</span>
            <span>
              <button title="Accepter" onClick={() => handleAccept(data.ID_Sortie, data.Date_Sortie)}>YES</button>
              <button title="Refuser" onClick={() => handleRefuse(data.ID_Sortie)}>NO</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LinePlan;
