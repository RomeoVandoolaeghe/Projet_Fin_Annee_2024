import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GroupCard from '../../../components/GroupCard/GroupCard';
import { FaUsers } from 'react-icons/fa';
import './Group.css';

const Group = ({ groups }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groupList, setGroupList] = useState(groups);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteGroup = (id) => {
    setGroupList(groupList.filter(group => group.id !== id));
  };

  const filteredGroups = groupList.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className='header'>
        <h2>Groupe <FaUsers /></h2>
      </div>
      <div className="group-page">
        <div className="header-actions">
          <input
            type="text"
            placeholder="Rechercher"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="group-grid">
          <div className="group-card">
            <Link to="/CreateGroup" className='nouveaugroupe'>
              <p><strong>Nouveau groupe</strong> <br /><FaUsers /></p>
            </Link>
          </div>
          {filteredGroups.map((group) => (
            <GroupCard
              key={group.id}
              id={group.id}
              name={group.name}
              image={group.image}
              color={group.color}
              onDelete={handleDeleteGroup}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Group;
