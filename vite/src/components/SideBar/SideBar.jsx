import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaUser, FaHome, FaCalendarAlt, FaUsers, FaTrophy, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './SideBar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <FaBars />
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/Profile">
              <FaUser /> <span>Profil</span>
            </Link>
          </li>
          <li>
            <Link to="/Parametres">
              <FaCog /> <span>Paramètres du compte</span>
            </Link>
          </li>
          <li>
            <Link to="/Logout">
              <FaSignOutAlt /> <span>Déconnexion</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
