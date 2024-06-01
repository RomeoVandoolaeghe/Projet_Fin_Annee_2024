import React from 'react';
import './GroupProfile.css';

const groups = [
  { name: 'Ragnar Lodbrok', status: 'online' },
  { name: 'Harald Hardrada', status: 'offline' },
  { name: 'Thorfinn Karlsefni', status: 'online' },
  { name: 'Thors Karlsefni', status: 'online' },
  { name: 'Leif Erikson', status: 'online' },
  { name: 'Thorkell Le Grand', status: 'online' },
  { name: 'Knut Le Grand', status: 'offline' },
  { name: 'Kjetill Eriksson', status: 'online' },
];

const GroupProfile = ({ isEditMode }) => {
  return (
    <div className="groups-list">
      <h4>Mes groupes</h4>
      <ul>
        {groups.map((group, index) => (
          <li key={index} className={group.status}>
            {group.name}
            <span className={`status ${group.status === 'online' ? 'green' : 'red'}`}></span>
          </li>
        ))}
      </ul>
      {isEditMode && <button>Ajouter un ami</button>}
    </div>
  );
}

export default GroupProfile;
