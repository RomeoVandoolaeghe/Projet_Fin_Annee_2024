import React, { useState } from 'react';
import axios from 'axios';
import './Parametres.css';
import { FaBars, FaUser, FaHome, FaCalendarAlt, FaUsers, FaTrophy, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Parametres = () => {
  const [pseudo, setPseudo] = useState('');
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [theme, setTheme] = useState('light');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('pseudo', pseudo);
    formData.append('photo', photo);
    formData.append('description', description);
    formData.append('password', password);
    formData.append('twoFactorAuth', twoFactorAuth);
    formData.append('emailNotifications', emailNotifications);
    formData.append('pushNotifications', pushNotifications);
    formData.append('language', language);
    formData.append('theme', theme);

    axios.post('http://localhost:3001/parametres', formData)
      .then(response => {
        console.log('Image mise à jour avec succès:', response.data);
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
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                placeholder="Modifier le pseudo"
              />
            </div>
            <div>
              <label>Photo de profil :</label>
              <input
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>
            <div>
              <label>Description :</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nouveau mot de passe"
              />
            </div>
          </section>

          <section>
            <h2>Disponibilités</h2>
            <div>
              <label>Modifier les disponibilités :</label>
              {/* Contenu de la table de disponibilités */}
            </div>
          </section>

          <button type="submit">Sauvegarder les modifications</button>
        </form>
      </div>
    </>
  );
};

export default Parametres;
