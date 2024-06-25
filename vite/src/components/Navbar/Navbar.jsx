import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // S'assurer que le fichier CSS est correctement lié
import { FaPowerOff } from 'react-icons/fa';
import axios from 'axios';

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);


  const handleLogout = () => {
    axios.post('http://localhost:3000/logout', { withCredentials: true })
      .then(response => {
        console.log('Réponse du serveur:', response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la requête POST:', error);
      });
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="logo.png" alt="Logo du site" className='img' />
      </div>
      <ul className="nav-links">
        <li><Link to="/Accueil">ACCUEIL</Link></li>
        <li><Link to="/Events">EVENEMENT</Link></li>
        <li><Link to="/Group">GROUPE</Link></li>
        <li><Link to="/HallOfFame">HALL OF FAME</Link></li>
        <li><Link to="/Profile">PROFIL</Link></li>
        <li onClick={handleLogout}>
          <Link to="/"><FaPowerOff /></Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;