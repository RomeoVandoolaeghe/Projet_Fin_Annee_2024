import React, { useState, useEffect } from 'react';
import './ProfileHeader.css';
import axios from 'axios';



const ProfileHeader = ({ isEditMode }) => {
  const [error, setError] = useState(null);
  const [initialAvailability, setDispo] = useState([]);
  const [user, setInitialUser] = useState([]);

  useEffect(() => {

    const fetchDescription = async () => {
      
      try {
        const response = await axios.get('http://localhost:3000/recup_description', { withCredentials: true });
        console.log("Réponse reçue description :", response.data.Description);
        if (response.data){
          setInitialUser(response.data);
        } else {
          console.error('Les données reçues ne sont pas valides', response.data);
        }
      } catch (error) {
        console.log("Erreur lors de la requête:", error);
        setError(error);
      }
    };
    fetchDescription();





    const fetchDispo = async () => {
      try {
        const response = await axios.get('http://localhost:3000/recup_dispo', { withCredentials: true });
        console.log("Réponse reçue:", response);
        if (response.data && Array.isArray(response.data)) {
          setDispo(response.data);
        } else {
          console.error('Les données reçues ne sont pas valides', response.data);
        }
      } catch (error) {
        console.log("Erreur lors de la requête:", error);
        setError(error);
      }
    };
    fetchDispo();



  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="ProfileHeader">
      <div className="profile-info">
        <div className="profile-picture">
          <img src="profil.jpg" alt="profile-picture" />
        </div>
        {isEditMode ? (
          <>
            <input
              type="text"
              name="Nom"
              value={user.Nom}
              onChange={handleInputChange}
            />
            {/* <textarea
              name="Description"
              value={user.Description}
              onChange={handleInputChange}
            /> */}
          </>
        ) : (
          <>
            <h3>
              Pseudo
            </h3>
            <p id='description'><strong>Ma Description : </strong>{user.Description}</p>
          </>
        )}
        <h4>Mes Disponibilités</h4>
        {error && ( // Affichage conditionnel du message d'erreur
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
            {initialAvailability.map((item, index) =>
              <tr key={index}>
                <td>{item.Jour}</td>
                <td>{item.Heure_debut}</td>
                <td>{item.Heure_fin}</td>

              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileHeader;
