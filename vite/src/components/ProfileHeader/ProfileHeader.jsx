import React, { useState } from 'react';
import './ProfileHeader.css';
import axios from 'axios';
import UseEffect 

const initialUser = {
  Nom: 'Yecir',
  Prenom: 'Badir',
  Email: 'yecir.badir@example.com',
  Telephone: '123-456-7890',
  Description: 'Ouvert communicatif aime rencontrer de nouvelles personnes et élargir son réseau social.',
};



const ProfileHeader = ({ isEditMode }) => {
  const [user, setUser] = useState(initialUser);
  const [error, setError] = useState(null);
  const [initialAvailability,setDispo]=useState([]);


  useEffect(() => {
    const fetchAmis = async () => {
      try {
        const response = await axios.get('http://localhost:3000/recup_dispo', { withCredentials: true });
        if (response.data && Array.isArray(response.data)) {
          setDispo(response.data);
        } else {
          console.error('Les données reçues ne sont pas valides', response.data);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchAmis();
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
            <input
              type="text"
              name="Prenom"
              value={user.Prenom}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="Email"
              value={user.Email}
              onChange={handleInputChange}
            />
            <input
              type="tel"
              name="Telephone"
              value={user.Telephone}
              onChange={handleInputChange}
            />
            <textarea
              name="Description"
              value={user.Description}
              onChange={handleInputChange}
            />
          </>
        ) : (
          <>
            <h3>
              {user.Nom} {user.Prenom}
            </h3>
            <p><strong>Email :</strong> {user.Email}</p>
            <p><strong>Téléphone :</strong> {user.Telephone}</p>
            <p><strong>Description : </strong>{user.Description}</p>
          </>
        )}
        <h4>Disponibilités</h4>
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
              <td>{item.day}</td>
              <td>
                <span>{item.start}</span>
              </td>
              <td>
                <span>{item.end}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
    </div>
  );
};

export default ProfileHeader;
