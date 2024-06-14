import React from 'react';
import './FormBox.css';
import { useState } from 'react'
import axios from 'axios'

const FormBox = () => {

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

  // Fonction pour gérer les changements dans le formulaire
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2({
      ...formData2,
      [name]: value
    });
  };

  // Utiliser le hook useState pour initialiser les données du formulaire
  const [formData2, setFormData2] = useState({
    pseudo: '',
    e_mail: '',
    password: '',
  });

  // Fonction pour réinitialiser le formulaire
  const resetForm2 = () => {
    setFormData2({
      pseudo: '',
      e_mail: '',
      password: '',
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
        console.log('Status:', response.status);
        if (response.status === 200) {
          window.location.href = 'http://localhost:5173/Accueil';
        }
      })
      .catch(error => {
        console.error('Erreur lors de la requête POST:', error);
      });

    resetForm(); // Clear le formulaire
  };


  // Fonction pour soumettre le formulaire
  const handleSubmit2 = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData2);

    // L'URL de l'API à laquelle vous envoyez la requête POST
    const url = 'http://localhost:3000/inscription';

    axios.post(url, formData2, { withCredentials: true })
      .then(response => {
        console.log('Réponse du serveur:', response.data);

      })
      .catch(error => {
        console.error('Erreur lors de la requête POST:', error);
      });

    resetForm2(); // Clear le formulaire
  };



  return (
    <div className="form-box">
      <div className="login-container" id="login">
        <div className="top">
          <span>Vous n'avez pas de compte ?<a href="#" onClick={() => window.register()}>S'inscrire</a></span>
          <header>Se connecter</header>
        </div>
        <div className="input-box">
          <input type="text" name="pseudo" className="input-field" placeholder="Votre Pseudo" value={formData.pseudo}
            onChange={handleChange} required/>
          <span className="material-symbols-outlined">mail</span>
        </div>
        <div className="input-box">
          <input type="password" name="password" className="input-field" placeholder="Votre Mot de passe" value={formData.password}
            onChange={handleChange} required />
          <span className="material-symbols-outlined">lock</span>
        </div>
        <div className="input-box">
          <input type="submit" className="submit" value="Se connecter" onClick={handleSubmit} />
        </div>
      </div>
      <div className="register-container" id="register">
        <div className="top">
          <span>Vous avez un compte ?<a href="#" onClick={() => window.login()}>Se connecter</a></span>
          <header>S'inscrire</header>
        </div>
        <div className="two-forms">
          <div className="input-box">
            <input type="text" className="input-field" placeholder="Pseudo" name="pseudo"
              value={formData2.pseudo}
              onChange={handleChange2} required/>
            <span className="material-symbols-outlined">person</span>
          </div>
        </div>
        <div className="input-box">
          <input type="text" className="input-field" placeholder="Email" name="e_mail"
            value={formData2.e_mail}
            onChange={handleChange2}
            pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
          />
          <span className="material-symbols-outlined">mail</span>

        </div>

        <div className="input-box">
          <input type="password" className="input-field" placeholder="Password" name="password"
            value={formData2.password}
            onChange={handleChange2}
            pattern="(?=.*\d)(?=.*[A-Z])(?=.*[@$!%*?&]).*"
            required />
          <span className="material-symbols-outlined">lock</span>
        </div>
        <div className="input-box">
          <input type="submit" className="submit" value="S'inscrire" onClick={handleSubmit2} />
        </div>


      </div>
    </div>
  );
};

export default FormBox;
