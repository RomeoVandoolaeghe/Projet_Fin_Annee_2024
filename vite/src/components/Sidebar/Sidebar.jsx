import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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