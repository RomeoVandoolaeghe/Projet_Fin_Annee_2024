import React from 'react';
import Navbar1 from '../../components/Navbar1/Navbar1';
import FormBox from '../../components/FormBox/FormBox.jsx';
import './Login.css';
import { useState } from 'react';










const Login = () => {

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
    axios.post(url, formData, { withCredentials: true })
      .then(response => {
        console.log('Réponse du serveur:', response.data);
        // document.cookie = "Pseudo_Cookie=" + formData.pseudo + "; path=/; max-age=500000;Secure"; // max-age en secondes (ici, 1 heure)
      })
      .catch(error => {
        console.error('Erreur lors de la requête POST:', error);
      });

    resetForm(); // Clear le formulaire
  };
  return (
    <div className="wrapper">
      <Navbar1 />
      <FormBox />
    </div>
  );
};

export default Login;
