import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
        <li><Link to="/Accueil">ACCUEIL</Link></li>
        <li><Link to="/Events">EVENEMENT</Link></li>
        <li><Link to="/Group">GROUPE</Link></li>
        <li><Link to="/HallOfFame">HALL OF FAME</Link></li>
        <li className="profile-menu" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
          <Link to="/Profile"><img className="profil-image" src="profil.jpg" alt="Profil de l'utilisateur" /></Link>
          {dropdownVisible && (
            <ul className="dropdown">
              <li><Link to="/Profile">Voir le profil</Link></li>
              <li><Link to="/Parametres">Paramètres du compte</Link></li>
              <li><Link to="/Logout">Déconnexion</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;