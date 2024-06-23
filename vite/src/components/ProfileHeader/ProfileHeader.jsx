import React, { useState, useEffect } from 'react';
import './ProfileHeader.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProfileHeader = ({ profileImage }) => {
  const [error, setError] = useState(null);
  const [initialAvailability, setDispo] = useState([]);
  const [user, setInitialUser] = useState([]);
  const [description, setInitialDescription] = useState([]);

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await axios.get('http://localhost:3000/recup_description', { withCredentials: true });
        if (response.data) {
          setInitialDescription(response.data);
        } else {
          console.error('Les données reçues ne sont pas valides', response.data);
        }
      } catch (error) {
        console.log("Erreur lors de la requête:", error);
        setError(error);
      }
    };
    fetchDescription();

    const fetchPseudo = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get_pseudo', { withCredentials: true });
        if (response.data) {
          setInitialUser(response.data);
        } else {
          console.error('Les données reçues ne sont pas valides', response.data);
        }
      } catch (error) {
        console.log("Erreur lors de la requête:", error);
        setError(error);
      }
    };
    fetchPseudo();

    const fetchDispo = async () => {
      try {
        const response = await axios.get('http://localhost:3000/recup_dispo', { withCredentials: true });
        if (response.data && Array.isArray(response.data)) {
          setDispo(response.data);
        }
        if(response.data == ''){
          document.getElementById('Erreur').innerHTML = "Vous n'avez pas encore renseigné vos disponibilités";
        }
        else {
          console.error('Les données reçues ne sont pas valides', response.data);
        }
      } catch (error) {
        console.log("Erreur lors de la requête:", error);
        setError(error);
      }
    };
    fetchDispo();
  }, []);

  return (
    <div className="ProfileHeader">
      <div className="profile-info">
        <div className="profile-picture">
          <img src={profileImage || "profil.jpg"} alt="profile-picture" />
        </div>
        <>
          <h3 id='pseudo'>{user.Pseudo}</h3>
          <p id='description'><strong>Ma Description : </strong>{description.Description}</p>
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
