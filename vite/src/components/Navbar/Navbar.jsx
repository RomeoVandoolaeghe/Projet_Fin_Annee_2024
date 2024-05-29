// src/components/navbar/navbar.jsx
import React from 'react';
import './Navbar.css';  // S'assurer que le fichier CSS est correctement lié

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo"><img src="logo.png" alt="Profil de l'utilisateur" /></div>
      <ul className="nav-links">
        <li><a href="/Accueil">ACCUEIL</a></li>
        <li><a href="/Events">EVENEMENT</a></li>
        <li><a href="/Group">GROUPE</a></li>
        <li><a href="/HallOfFame">HALL OF FAME</a></li>
        <li><a href="/Profile"><img className="profil-image" src="profil.jpg" alt="Profil de l'utilisateur" /></a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
