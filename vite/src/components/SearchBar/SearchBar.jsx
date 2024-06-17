// SearchBar.jsx
import React, { useState } from 'react';
import './SearchBar.css';
import axios from 'axios';

const SearchBar = () => {
  // Déclaration de l'état pour l'erreur
  const [error, setError] = useState(null);

  // Déclaration de l'état pour les données du formulaire
  const [formData, setFormData] = useState({
    term: '',
  });





  // Gestion du changement dans l'input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Réinitialisation du formulaire
  const resetForm = () => {
    setFormData({
      term: '',
    });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    const url = 'http://localhost:3000/search_utilisateur_id';

    axios
      .post(url, { champ: formData.term }, { withCredentials: true })
      .then((response) => {
        console.log('Réponse du serveur:', response.data);
        const id_utilisateur = response.data.ID_utilisateur;
        console.log('ID utilisateur:', id_utilisateur);


        // Faire une deuxième requête avec l'ID utilisateur
        axios.post('http://localhost:3000/verif_ami',{ID_utilisateur2 : formData.id_utilisateur},{ withCredentials: true })
          .then((response) => {
            console.log('Réponse du serveur:', response.data);
          })
          .catch((error) => {
            console.error('Erreur lors de la requête POST:', error);
            setError('Une erreur est survenue lors de l\'ajout de l\'ami.');
          });
      })
      .catch((error) => {
        console.error('Erreur lors de la requête POST:', error);
        setError('Une erreur est survenue lors de la recherche.');
      });

    resetForm();
  };


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="term"
        placeholder="Rechercher des amis"
        value={formData.term}
        onChange={handleChange}
      />
      <button type="submit">Rechercher</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default SearchBar;
