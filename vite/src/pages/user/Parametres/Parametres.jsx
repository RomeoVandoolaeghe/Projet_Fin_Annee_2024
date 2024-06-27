import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Parametres.css';
import Navbar from '../../../components/Navbar/Navbar';
import { FaCog } from 'react-icons/fa';

const Parametres = ({ onImageSelect }) => {
  const [formData, setFormData] = useState({
    jour: '',
    heure_debut: '',
    heure_fin: '',
  });

  const [formData2, setFormData2] = useState({
    description: '',
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




  const handleSubmit2 = (e) => {
    e.preventDefault();
    if (formData2.description !== '') {
      axios.post('http://localhost:3000/edit_description', { description: formData2.description }, { withCredentials: true })
        .then(response => {
          alert('La description a été modifiée', response.data);
        })
        .catch(error => {
          console.error('Erreur lors de l\'insertion de la description', error);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.jour = document.getElementById('jours').value;
    formData.heure_debut = document.getElementById('time_debut').value;
    formData.heure_fin = document.getElementById('time_fin').value;
    if (formData.heure_debut >= formData.heure_fin) {
      alert('L\'heure de début doit être inférieure à l\'heure de fin');
      return;
    }

    axios.post('http://localhost:3000/verif_dispo', { jour: formData.jour }, { withCredentials: true })
      .then(response => {
        const occurence = response.data.occurence;
        if (occurence === 1) {
          axios.post('http://localhost:3000/modif_dispo', { jour: formData.jour, heure_debut: formData.heure_debut, heure_fin: formData.heure_fin }, { withCredentials: true })
            .then(response => {
              alert('Disponibilité modifiée avec succès', response.data);
            })
            .catch(error => {
              console.error('Erreur lors de la mise à jour de la disponibilité', error);
            });
        }
        if (occurence === 0) {
          axios.post('http://localhost:3000/ajout_dispo', { jour: formData.jour, heure_debut: formData.heure_debut, heure_fin: formData.heure_fin }, { withCredentials: true })
            .then(response => {
              alert('Disponibilité ajoutée avec succès', response.data);
            })
            .catch(error => {
              console.error('Erreur lors de l\'ajout de la disponibilité', error);
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
    axios.post('http://localhost:3000/verif_dispo', { jour: formData.jour }, { withCredentials: true })
      .then(response => {
        const occurence = response.data.occurence;
        if (occurence === 1) {
          axios.post('http://localhost:3000/delete_dispo', { jour: formData.jour }, { withCredentials: true })
            .then(response => {
              alert('Disponibilité supprimée avec succès', response.data);
            })
            .catch(error => {
              console.error('Erreur lors de la suppression de la disponibilité', error);
            });
        }
        if (occurence === 0) {
          alert('Vous n\'avez pas de disponibilité à supprimer pour ce jour');
        }
      })
      .catch(error => {
        console.error('Erreur', error);
      });
  };

  const handleDescriptionChange = (e) => {
    setFormData2({ ...formData2, description: e.target.value });
  };




  return (
    <>
      <Navbar />
      <div className='header'>
        <h2>Paramètres du compte <FaCog /></h2>
      </div>
      <div className="parametres">
        <form onSubmit={handleSubmit}>
          <section>
            <h2>Informations Personnelles</h2>
            <div>
              <label id="description">Description :</label>
              <textarea
                placeholder="Modifier la description"
                id="description"
                value={formData2.description}
                onChange={handleDescriptionChange}
              ></textarea>
              <button type="submit" onClick={handleSubmit2}>Modifier</button>
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
              <button className='button_1' type="submit" onClick={handleSubmit_supp}>Supprimer</button>

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

