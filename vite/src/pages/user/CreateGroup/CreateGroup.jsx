import React, { useEffect, useState } from 'react';
import './CreateGroup.css';
import axios from 'axios';
import Navbar from '../../../components/Navbar/Navbar';


// Composant CreateGroup
const CreateGroup = () => {
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ type: '', message: '', visible: false });

  // Déclaration de l'état pour les données du formulaire
  const [formData, setFormData] = useState({
    term: '',
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

  // Fonction pour ajouter un membre
  const Add_member = async () => {
    try {
      const response = await axios.post('http://localhost:3000/add_member', { nomgroupe: formData.term }, { withCredentials: true });
      console.log('Réponse du serveur:', response.data);
    } catch (error) {
      console.error('Erreur lors de la requête POST:', error);
      setNotification({ type: 'error', message: 'Une erreur est survenue lors de l\'ajout du membre.', visible: true });
    }
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/create_group', { nom_groupe: formData.term }, { withCredentials: true })
      .then((response) => {
        console.log('Réponse du serveur:', response.data);
        setNotification({ type: 'success', message: 'Groupe créé avec succès!', visible: true });
        Add_member();
        resetForm();
        window.location.href = 'http://localhost:5173/Group';
      })
      .catch((error) => {
        console.error('Erreur lors de la requête POST:', error);
        setNotification({ type: 'error', message: 'Une erreur est survenue lors de la création du groupe.', visible: true });
      });

    // Masquer la notification après 5 secondes
    setTimeout(() => {
      setNotification({ ...notification, visible: false });
    }, 5000);
  };

  return (
    <>
      <Navbar />
      {notification.visible && (
        <div className={`notification reveal ${notification.type}-msg`}>
          <i className={`fa fa-${notification.type === 'success' ? 'check' : 'times-circle'}`}></i>
          {notification.message}
        </div>
      )}
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
    </>
  );
};

export default CreateGroup;
