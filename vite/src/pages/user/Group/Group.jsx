import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GroupCard from '../../../components/GroupCard/GroupCard';
import { FaUsers } from 'react-icons/fa';
import './Group.css';
import axios from 'axios';
import Navbar from '../../../components/Navbar/Navbar';
import { saveContent } from './export_content'; // Importer la fonction d'exportation

const Group = ({ groups = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groupList, setGroupList] = useState(groups);
  const [error, setError] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = (id, name) => {
    saveContent(id, name); // Exporter le contenu
  };

  const handleDelete = (id) => {
    setGroupList((prevGroups) => prevGroups.filter((group) => group.ID_Groupe !== id));
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:3000/recup_group', { withCredentials: true });
        if (response.data && Array.isArray(response.data)) {
          setGroupList(response.data);
          console.log('Groupes :', response.data);
        } else {
          console.error('Les données reçues ne sont pas valides', response.data);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <>
      <Navbar />
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
              key={group.ID_Groupe}
              name={group.Nom_Groupe}
              id={group.ID_Groupe}
              onClick={handleClick}
              onDelete={handleDelete} // Passer la fonction de suppression en tant que prop
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Group;
