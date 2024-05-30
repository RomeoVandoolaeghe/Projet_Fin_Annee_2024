import React from 'react';
import './ProfileHeader.css';

const user = [
        { 
                Nom: ' Thorkell', 
                Prenom: 'Le Grand', 
                Description:'Ouvert communicatif aime rencontrer de nouvelles personnes et élargir son réseau social. Trouve de lénergie dans les interactions avec les autres et aime être au centre de lactivité sociale.',
        },
    ];

const ProfileHeader = () => {
  return (
    <div className="ProfileHeader">
      <div className="profile-info">
        <div className="profile-picture"><img src="profil.jpg" alt="profile-picture" /></div>
        {user.map((item) => (
            <h3>
                {item.Nom} {item.Prenom}
            </h3>
        ))}
        {user.map((item) => (
            <p>
                {item.Description}
            </p>
        ))}
        </div>
    </div>
  );
}

export default ProfileHeader;
