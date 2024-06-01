import React, { useState } from 'react';
import './ProfileHeader.css';

const initialUser = {
  Nom: ' Yecir',
  Prenom: 'Badir',
  Description: 'Ouvert communicatif aime rencontrer de nouvelles personnes et élargir son réseau social.',
};

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
            <p>{user.Description}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
