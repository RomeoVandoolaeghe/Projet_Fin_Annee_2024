import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCog, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = ({ searchTerm, handleSearch, searchResults, toggleSettings, showSettings }) => (
  <div className="sidebar">
    <div className="sidebar-header">
      <FontAwesomeIcon icon={faCog} className="settings-icon hover-icon" onClick={toggleSettings} />
      <h3>Discussion</h3>
      <FontAwesomeIcon icon={faUserPlus} className="add-user-icon hover-icon" />
      {showSettings && (
        <div className="settings-dropdown">
          <ul>
            <li>Profil</li>
            <li>Paramètres</li>
            <li>Déconnexion</li>
          </ul>
        </div>
      )}
    </div>
    <div className="search">
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
      <input
        type="text"
        placeholder="Rechercher un membre"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
    <div className="group-members">
      <h3>Membres du groupe</h3>
      <ul>
        {searchResults.map(user => (
          <li key={user.id}>
            <img src={user.image} alt={user.name} className="member-avatar" />
            <div className="member-info">
              <span>{user.name}</span>
              <span className="status">{user.status}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Sidebar;
