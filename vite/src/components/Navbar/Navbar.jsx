import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // S'assurer que le fichier CSS est correctement lié

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/Accueil">ACCUEIL</Link></li>
        <li><Link to="/Events">EVENEMENT</Link></li>
        <li><Link to="/Group">GROUPE</Link></li>
        <li><Link to="/HallOfFame">HALL OF FAME</Link></li>
        <li><Link to="/Profile">PROFIL</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;