import React, { useEffect, useState } from 'react';
import './CreateGroup.css';
import axios from 'axios';

const CreateGroup = () => {
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




  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/create_group', { nom_groupe: formData.term }, { withCredentials: true })
      .then((response) => {
        console.log('Réponse du serveur:', response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la requête POST:', error);
        setError('Une erreur est survenue lors de la recherche.');
      });
    resetForm();
  };

  return (
    <div className="create-group-form-container">
      <header>
        <h5>Créer un groupe</h5>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="group-name">Nom du groupe :</label>
          <input
            type="text"
            id="group-name"
            name="term"
            value={formData.term}
            onChange={handleChange}

            // onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </div>

        <div className="form-group buttons">
          <button type="button" onClick={() => window.history.back()}>
            Retour
          </button>
          <button type="submit">Créer</button>

        </div>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default CreateGroup;
