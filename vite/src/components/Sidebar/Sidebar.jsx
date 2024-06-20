
import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';
import axios from 'axios';

const Sidebar = () => {
  const handleLogout = () => {
    axios.post('http://localhost:3000/logout', { withCredentials: true })
      .then(response => {
        console.log('Réponse du serveur:', response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la requête POST:', error);
      });
  }

  return (
    <div className="sidebar">
      
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/Parametres">
              <FaCog /> <span>Paramètres du compte</span>
            </Link>
          </li>
          <li onClick={handleLogout}>
            <Link to="/">
              <FaSignOutAlt /> <span>Déconnexion</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;