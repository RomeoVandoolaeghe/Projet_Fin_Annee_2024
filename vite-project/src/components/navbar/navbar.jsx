// src/components/navbar/navbar.jsx
import React from 'react';
import './navbar.css';  // S'assurer que le fichier CSS est correctement lié

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">LOGO</div>
      <ul className="nav-links">
        <li><a href="/">ACCUEIL</a></li>
        <li><a href="/events">EVENEMENT</a></li>
        <li><a href="/group">GROUPE</a></li>
        <li><a href="/hall-of-fame">HALL OF FAME</a></li>
        <li><a href="/profil">PROFIL</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
