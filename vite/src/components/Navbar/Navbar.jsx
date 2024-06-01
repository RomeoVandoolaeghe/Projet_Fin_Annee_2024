import React, { useState } from 'react';
import './Navbar.css';  // S'assurer que le fichier CSS est correctement lié

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className="navbar">
      <div className="logo"><img src="logo.png" alt="Logo du site" /></div>
      <ul className="nav-links">
        <li><a href="/Accueil">ACCUEIL</a></li>
        <li><a href="/Events">EVENEMENT</a></li>
        <li><a href="/Group">GROUPE</a></li>
        <li><a href="/HallOfFame">HALL OF FAME</a></li>
        <li className="profile-menu" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
          <a href="/Profile"><img className="profil-image" src="profil.jpg" alt="Profil de l'utilisateur" /></a>
          {dropdownVisible && (
            <ul className="dropdown">
              <li><a href="/Profile">Voir le profil</a></li>
              <li><a href="/Settings">Paramètres du compte</a></li>
              <li><a href="/Logout">Déconnexion</a></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
