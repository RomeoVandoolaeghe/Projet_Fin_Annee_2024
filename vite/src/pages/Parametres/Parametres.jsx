// Parametres.jsx
import React, { useState } from 'react';
import './Parametres.css';

const Parametres = () => {
  // States for each section
  const [pseudo, setPseudo] = useState('');
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [availability, setAvailability] = useState('');
  const [language, setLanguage] = useState('fr');
  const [theme, setTheme] = useState('light');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      pseudo,
      photo,
      description,
      password,
      twoFactorAuth,
      emailNotifications,
      pushNotifications,
      availability,
      language,
      theme
    });
  };

  return (
    <div className="parametres">
      <h1>Paramètres du compte</h1>
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
          <div>
            <label>Authentification à deux facteurs :</label>
            <input
              type="checkbox"
              checked={twoFactorAuth}
              onChange={(e) => setTwoFactorAuth(e.target.checked)}
            />
          </div>
        </section>

        <section>
          <h2>Préférences de Notifications</h2>
          <div>
            <label>Notifications par email :</label>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
            />
          </div>
          <div>
            <label>Notifications push :</label>
            <input
              type="checkbox"
              checked={pushNotifications}
              onChange={(e) => setPushNotifications(e.target.checked)}
            />
          </div>
        </section>

        <section>
          <h2>Disponibilités</h2>
          <div>
            <label>Modifier les disponibilités :</label>
            <input
              type="date"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            />
          </div>
        </section>

        <section>
          <h2>Préférences Générales</h2>
          <div>
            <label>Langue :</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="fr">Français</option>
              <option value="en">Anglais</option>
            </select>
          </div>
          <div>
            <label>Thème :</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="light">Clair</option>
              <option value="dark">Sombre</option>
            </select>
          </div>
        </section>

        <button type="submit">Sauvegarder les modifications</button>
      </form>
    </div>
  );
};

export default Parametres;
