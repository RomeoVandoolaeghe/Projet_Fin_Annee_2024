import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GroupCard from '../../../components/GroupCard/GroupCard';
import { FaUsers } from 'react-icons/fa';
import './Group.css';
import axios from 'axios';
import Navbar from '../../../components/Navbar/Navbar';
import { saveContent } from './export_content'; // Importer la fonction d'exportation

// Composant Group
const Group = ({ groups = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groupList, setGroupList] = useState(groups);
  const [error, setError] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = (groupName) => {
    saveContent(groupName); // Exporter le contenu
  };

  // Récupération des groupes
  useEffect(() => {
    const fetchGroupe = async () => {
      try {
        const response = await axios.get('http://localhost:3000/recup_group', { withCredentials: true });
        if (response.data && Array.isArray(response.data)) {
          setGroupList(response.data); // Mise à jour de groupList avec les données de l'API
        } else {
          console.error('Les données reçues ne sont pas valides', response.data);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchGroupe();
  }, []);

  // Filtrage des groupes
  const filteredGroups = groupList.filter(group =>
    group.Nom_Groupe && group.Nom_Groupe.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              key={group.Nom_Groupe}
              name={group.Nom_Groupe}
              onClick={handleClick}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Group;