import React, { useState } from 'react';
import './ProfileHeader.css';


const initialUser = {
  Nom: 'Yecir',
  Prenom: 'Badir',
  Email: 'yecir.badir@example.com',
  Telephone: '123-456-7890',
  Description: 'Ouvert communicatif aime rencontrer de nouvelles personnes et élargir son réseau social.',
};

const initialAvailability = [
  { day: 'Lundi', start: '09:00', end: '18:00' },
  { day: 'Mardi', start: '09:00', end: '18:00' },
  { day: 'Mercredi', start: '09:00', end: '18:00' },
  { day: 'Jeudi', start: '09:00', end: '18:00' },
  { day: 'Vendredi', start: '09:00', end: '18:00' },
];

const ProfileHeader = ({ isEditMode }) => {
  const [user, setUser] = useState(initialUser);

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
