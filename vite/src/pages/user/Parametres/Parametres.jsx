import React, { useState } from 'react';
import axios from 'axios';
import './Parametres.css';
import { FaBars, FaUser, FaHome, FaCalendarAlt, FaUsers, FaTrophy, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Parametres = () => {



  const handleSubmit = (e) => {
    e.preventDefault();


    const jour = document.getElementById('jours').value;
    const heure_debut = document.getElementById('time_debut').value;
    const heure_fin = document.getElementById('time_fin').value;

    if(heure_debut >= heure_fin){
      alert('L\'heure de début doit être inférieure à l\'heure de fin');
      return;
    }


    axios.post('http://localhost:3001/modif_dispo', { jour: jour, heure_debut: heure_debut, heure_fin: heure_fin }, { withCredentials: true })
      .then(response => {
        console.log('Disponibilité modifiée avec succès:', response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de l\'image:', error);
      });
  };

  return (
    <>
      <div className='header'>
        <h2>Paramètres du compte <FaCog /> </h2>
      </div>
      <div className="parametres">
        <form onSubmit={handleSubmit}>
          <section>
            <h2>Informations Personnelles</h2>
            <div>
              <label>Pseudo :</label>
              <input
                type="text"
                placeholder="Modifier le pseudo"
              />
            </div>
            <div>
              <label>Photo de profil :</label>
              <input
                type="file"
              />
            </div>
            <div>
              <label>Description :</label>
              <textarea

                placeholder="Modifier la description"
              ></textarea>
            </div>
          </section>

          <section>
            <h2>Sécurité et Confidentialité</h2>
            <div>
              <label>Changer le mot de passe :</label>
              <input
                type="password"
                placeholder="Nouveau mot de passe"
              />
            </div>
          </section>

          <section>
            <h2>Disponibilités</h2>
            <div>
              <label>Modifier vos disponibilités</label>
    

                  <label name="jour">Choisissez un jour :</label>
                  <select id="jours" name="jours">
                    <option value="Lundi">Lundi</option>
                    <option value="Mardi">Mardi</option>
                    <option value="Mercredi">Mercredi</option>
                    <option value="Jeudi">Jeudi</option>
                    <option value="Vendredi">Vendredi</option>
                    <option value="Samedi">Samedi</option>
                    <option value="Dimanche">Dimanche</option>
                  </select>

                  <label name="time">Choisissez une heure de début :</label>
                  <input type="time" id="time_debut" name="time" required/>

                  <label name="time">Choisissez une heure de fin :</label>
                  <input type="time" id="time_fin" name="time" required/>

                  <button type="submit" onClick={handleSubmit}>Sauvegarder vos disponibilités</button>
                
 

 
          
            </div>
          </section>


        </form>
      </div>
    </>
  );
};

export default Parametres;