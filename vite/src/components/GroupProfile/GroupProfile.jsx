import React from 'react';
import './GroupProfile.css';

const groups = [
  { name: 'Ragnar Lodbrok'},
  { name: 'Harald Hardrada'},
  { name: 'Thorfinn Karlsefni'},
  { name: 'Thors Karlsefni'},
  { name: 'Leif Erikson'},
  { name: 'Thorkell Le Grand'},
  { name: 'Knut Le Grand'},
  { name: 'Kjetill Eriksson'},
];

const GroupProfile = ({ isEditMode }) => {
  return (
    <div className="groups-list">
      <h4>Mes groupes</h4>
      <ul>
        {groups.map((group, index) => (
          <li key={index}>
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupProfile;
