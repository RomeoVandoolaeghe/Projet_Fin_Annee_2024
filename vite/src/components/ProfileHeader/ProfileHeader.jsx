import React from 'react';
import './ProfileHeader.css';

const ProfileHeader = () => {
  return (
    <div className="ProfileHeader">
      <div className="profile-info">
        <div className="profile-picture"><img src="profil.jpg" alt="profile-picture" /></div>
        <h3>JACQUES WEBSTER</h3>
      </div>
      <div className="description">
        <h4>Description</h4>
        <p>Ouvert, communicatif, aime rencontrer de nouvelles personnes et élargir son réseau social. Trouve de l'énergie dans les interactions avec les autres et aime être au centre de l'activité sociale.</p>
      </div>
    </div>
  );
}

export default ProfileHeader;
