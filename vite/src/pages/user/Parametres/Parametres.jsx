// Importation des bibliothèques nécessaires
import React, { useState } from 'react';
import axios from 'axios';
import './Parametres.css';
import Navbar from '../../../components/Navbar/Navbar';
import { FaCog } from 'react-icons/fa';

// Suggestions d'images pour la photo de profil
const suggestions = [
  '/public/image/amis1.jpg',
  '/public/image/lieu2.jpg',
  '/public/image/lieu1.jpeg',
];

// Composant Parametres
const Parametres = ({ onImageSelect }) => {
  // État pour les données du formulaire de disponibilités
  const [formData, setFormData] = useState({
    jour: '',
    heure_debut: '',
    heure_fin: '',
  });

  // État pour les données du formulaire de description
  const [formData2, setFormData2] = useState({
    description: '',
  });

  // État pour l'image sélectionnée
  const [selectedImage, setSelectedImage] = useState('');

  // Gestion de la soumission du formulaire de description
  const handleSubmit2 = (e) => {
    e.preventDefault();
    console.log(formData2.description);

    // Si la description n'est pas vide, faire une requête pour la modifier
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

  // Gestion de la soumission du formulaire de disponibilités
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mise à jour des données du formulaire
    formData.jour = document.getElementById('jours').value;
    formData.heure_debut = document.getElementById('time_debut').value;
    formData.heure_fin = document.getElementById('time_fin').value;
    console.log(formData.jour, formData.heure_debut, formData.heure_fin);

    // Vérification que l'heure de début est inférieure à l'heure de fin
    if (formData.heure_debut >= formData.heure_fin) {
      alert('L\'heure de début doit être inférieure à l\'heure de fin');
      return;
    }

    // Vérification des disponibilités existantes pour le jour sélectionné
    axios.post('http://localhost:3000/verif_dispo', { jour: formData.jour }, { withCredentials: true })
      .then(response => {
        console.log('nb occurence:', response.data.occurence);
        const occurence = response.data.occurence;
        // Modification ou ajout de la disponibilité en fonction de l'existence d'une entrée
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

  // Gestion de la suppression des disponibilités
  const handleSubmit_supp = (e) => {
    e.preventDefault();
    formData.jour = document.getElementById('jours').value;
    console.log(formData.jour);

    // Vérification des disponibilités existantes pour le jour sélectionné
    axios.post('http://localhost:3000/verif_dispo', { jour: formData.jour }, { withCredentials: true })
      .then(response => {
        console.log('nb occurence:', response.data.occurence);
        const occurence = response.data.occurence;
        // Suppression de la disponibilité si elle existe
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

  // Gestion de la modification de la description
  const handleDescriptionChange = (e) => {
    setFormData2({ ...formData2, description: e.target.value });
  };

  // Gestion de la sélection d'une image
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Gestion de l'enregistrement de l'image sélectionnée
  const handleSaveImage = () => {
    onImageSelect(selectedImage);
    alert('Image de profil mise à jour');
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
              <label>Photo de profil :</label>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {suggestions.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`suggestion-${index}`}
                    style={{
                      width: '100px',
                      height: '100px',
                      margin: '10px',
                      border: selectedImage === image ? '3px solid blue' : '1px solid gray',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleImageClick(image)}
                  />
                ))}
              </div>
              <button type="button" onClick={handleSaveImage}>Enregistrer l'image</button>
            </div>
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
