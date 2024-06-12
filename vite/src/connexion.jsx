import { useState } from 'react'
import axios from 'axios';


// Composant pour gérer la connexion
function Connexion() {

  // Utiliser le hook useState pour initialiser les données du formulaire
  const [formData, setFormData] = useState({
    pseudo: '',
    password: '',
  });

  // Fonction pour gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

// Fonction pour réinitialiser le formulaire
  const resetForm = () => {
    setFormData({
      pseudo: '',
      password: '',
    });
  };


// Fonction pour soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    // L'URL de l'API à laquelle vous envoyez la requête POST
    const url = 'http://localhost:3000/connexion';

    // Envoi de la requête POST à l'API
    axios.post(url, formData)
      .then(response => {
        console.log('Réponse du serveur:', response.data);
        document.cookie = "Pseudo_Cookie=" + formData.pseudo + "; path=/; max-age=500000"; // max-age en secondes (ici, 1 heure)

      })
      .catch(error => {
        console.error('Erreur lors de la requête POST:', error);
      });

    resetForm(); // Clear le formulaire
    };



  return (
    <div className="App">
      <h1>Formulaire de Connexion</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pseudo">Pseudo: </label>
          <input
            type="text"
            id="pseudo"
            name="pseudo"
            value={formData.pseudo}
            onChange={handleChange}
          />
        </div>
        <br></br>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <br></br>
        <button type="submit">Envoyer </button>
      </form>
    </div>
  );
}

export default Connexion
