import React, { useState } from 'react';
import axios from 'axios';
import './Parametres.css';
import { FaBars, FaUser, FaHome, FaCalendarAlt, FaUsers, FaTrophy, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Parametres = () => {


  // Déclaration de l'état pour les données du formulaire
  const [formData, setFormData] = useState({
    jour: '',
    heure_debut: '',
    heure_fin: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    var occurence;

    formData.jour = document.getElementById('jours').value;
    formData.heure_debut = document.getElementById('time_debut').value;
    formData.heure_fin = document.getElementById('time_fin').value;
    console.log(formData.jour, formData.heure_debut, formData.heure_fin);
    if (formData.heure_debut >= formData.heure_fin) {
      alert('L\'heure de début doit être inférieure à l\'heure de fin');
      return;
    }


    axios.post('http://localhost:3000/verif_dispo', { jour: formData.jour }, { withCredentials: true })
      .then(response => {

        console.log('nb occurence:', response.data.occurence);
        occurence = response.data.occurence;
        if (occurence == 1) {
          axios.post('http://localhost:3000/modif_dispo', { jour: formData.jour, heure_debut: formData.heure_debut, heure_fin: formData.heure_fin }, { withCredentials: true })
            .then(response => {
              alert('Disponibilité modifiée avec succès', response.data);
            })
            .catch(error => {
              console.error('Erreur lors de la mise de la dispo', error);
            });
        }
        if (occurence == 0) {
          axios.post('http://localhost:3000/ajout_dispo', { jour: formData.jour, heure_debut: formData.heure_debut, heure_fin: formData.heure_fin }, { withCredentials: true })
            .then(response => {
              alert('Disponibilité ajoutée avec succès', response.data);
            })
            .catch(error => {
              console.error('Erreur lors de la mise de la dispo', error);
            });
        }
      })

      .catch(error => {
        console.error('Erreur', error);
      });

  };

  const handleSubmit_supp = (e) => {
    e.preventDefault();
    formData.jour = document.getElementById('jours').value;
    console.log(formData.jour);

    var occurence;
    axios.post('http://localhost:3000/verif_dispo', { jour: formData.jour }, { withCredentials: true })
      .then(response => {

        console.log('nb occurence:', response.data.occurence);
        occurence = response.data.occurence;
        if (occurence == 1) {
          axios.post('http://localhost:3000/delete_dispo', { jour: formData.jour }, { withCredentials: true })
            .then(response => {
              alert('Disponibilité supprimée avec succès', response.data);
            })
            .catch(error => {
              console.error('Erreur lors de la suppresion de la dispo', error);
            });
        }
        if (occurence == 0) {
          alert('Vous n\'avez pas de disponibilité à supprimer pour ce jour');
        }
      })

      .catch(error => {
        console.error('Erreur', error);
      });
  }

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
              <input type="time" id="time_debut" name="time" required />
              <button className='button_1' type="submit" onClick={handleSubmit_supp}>Supprimer </button>

              <label name="time">Choisissez une heure de fin :</label>
              <input type="time" id="time_fin" name="time" required />

              <button type="submit" onClick={handleSubmit}>Sauvegarder vos disponibilités</button>





            </div>
          </section>


        </form>
      </div>
    </>
  );
};

export default Parametres;