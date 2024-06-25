
import React, { useState, useEffect } from 'react';
import './ProfileHeader.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProfileHeader = () => {
  const [error, setError] = useState(null);
  const [initialAvailability, setDispo] = useState([]);
  const [user, setUser] = useState({});
  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await axios.get('http://localhost:3000/recup_description', { withCredentials: true });
        if (response.data) {
          setDescription(response.data.Description);
        } else {
          console.error('Les données reçues ne sont pas valides', response.data);
        }
      } catch (error) {
        console.log("Erreur lors de la requête:", error);
        setError(error);
      }
    };

    const fetchPseudo = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get_pseudo', { withCredentials: true });
        if (response.data) {
          setUser(response.data);
        } else {
          console.error('Les données reçues ne sont pas valides', response.data);
        }
      } catch (error) {
        console.log("Erreur lors de la requête:", error);
        setError(error);
      }
    };

    const fetchDispo = async () => {
      try {
        const response = await axios.get('http://localhost:3000/recup_dispo', { withCredentials: true });
        if (response.data && Array.isArray(response.data)) {
          setDispo(response.data);
        }
        if (response.data === '') {
          document.getElementById('Erreur').innerHTML = "Vous n'avez pas encore renseigné vos disponibilités";
        } else {
          console.error('Les données reçues ne sont pas valides', response.data);
        }
      } catch (error) {
        console.log("Erreur lors de la requête:", error);
        setError(error);
      }
    };

    const fetchProfileImage = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get_profile_image', { withCredentials: true });
        if (response.data && response.data.image) {
          setProfileImage(`/public/image/${response.data.image}`);
        }
      } catch (error) {
        console.log("Erreur lors de la récupération de l'image de profil:", error);
        setError(error);
      }
    };

    fetchDescription();
    fetchPseudo();
    fetchDispo();
    fetchProfileImage();
  }, []);

  return (
    <div className="ProfileHeader">
      <div className="profile-info">
        <div className="profile-picture">
          <img src={profileImage || "/public/image/profil.jpg"} alt="profile" />
        </div>
        <>
          <h3 id='pseudo'>{user.Pseudo}</h3>
          <p id='description'><strong>Ma Description : </strong>{description}</p>
        </>
        <h4>Mes Disponibilités</h4>
        {error && (
          <p className="error-message">Erreur lors du chargement des disponibilités: {error.message}</p>
        )}
        <table className="availability-table">
          <thead>
            <tr>
              <th>Jour</th>
              <th>Début</th>
              <th>Fin</th>
            </tr>
          </thead>
          <tbody>
            {initialAvailability.map((item, index) => (
              <tr key={index}>
                <td>{item.Jour}</td>
                <td>{item.Heure_debut}</td>
                <td>{item.Heure_fin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h5 id='Erreur'></h5>
      <Link to="/Parametres"><button>Modifier mon profil</button></Link>
    </div>
  );
};

export default ProfileHeader;

