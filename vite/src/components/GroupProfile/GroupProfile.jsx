import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GroupProfile.css';

const GroupProfile = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/groupes')
      .then(response => {
        setGroups(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des groupes:', error);
      });
  }, []);

  return (
    <div className="groups-list">
      <h4>Mes groupes</h4>
      <ul>
        {groups.map((group, index) => (
          <li key={index}>
            {group.Nom_groupe}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupProfile;
