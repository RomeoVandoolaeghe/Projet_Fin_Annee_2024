import React from 'react';
import './Group.css';
import { Link } from 'react-router-dom';
import GroupCard from '../../components/GroupCard/GroupCard';
import { FaBars, FaUser, FaHome, FaCalendarAlt, FaUsers, FaTrophy, FaCog, FaSignOutAlt } from 'react-icons/fa';
import '../../pages/CHAT/CHAT';

const groups = [
  { name: 'ASTRO WORD', image: ' A ' },
];


const Group = () => {
  return (
    <>
      <div className='header'>
        <h2>Groupe <FaUsers /></h2>
      </div>
      <div className="group-page">
          <div className="header-actions">
            <input type="text" placeholder="Rechercher" />
          </div>
        <div className="group-grid">
          <div className="group-card">
            <Link to="/CreateGroup" className='nouveaugroupe'>
              <p><strong>Nouveau groupe</strong> <br /><FaUsers /></p>
            </Link>
          </div>
          
            {groups.map((group, index) => (
              <GroupCard key={index} name={group.name} image={group.image} />
            ))}
          
        </div>
      </div>
    </>
  );
};

export default Group;