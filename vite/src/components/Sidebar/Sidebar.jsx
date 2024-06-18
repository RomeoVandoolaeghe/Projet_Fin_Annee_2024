import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';
import axios from 'axios';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


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
    <>
      {isOpen && <div onClick={toggleSidebar} className="overlay"></div>}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          <FaBars />
        </div>
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
    </>
  );
};

export default Sidebar;