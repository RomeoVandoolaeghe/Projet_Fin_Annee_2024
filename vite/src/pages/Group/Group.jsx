import React from 'react';
import './Group.css';
import GroupCard from '../../components/GroupCard/GroupCard';
<<<<<<< HEAD
=======
import { Link } from 'react-router-dom';
>>>>>>> origin/test_lauric

const groups = [
  { name: 'ASTRO WORD', image: ' A ' },
  { name: 'JUNIA ISEN', image: 'I' },
  { name: 'IA', image: 'IA' },
  { name: 'Solo', image: 'S' },
  { name: 'Skyclue', image: 'S' },
  { name: 'Fairy', image: 'F' },
  { name: 'LAFAME', image: 'L' },
  { name: 'Sabertooth', image: 'S' },
  { name: 'Mermaid', image: 'M' },
];

const Group = () => {
  return (
    <div className="group-page">
      <header>
        <h1>Groupe</h1>
        <div className="header-actions">
          <input type="text" placeholder="Rechercher" />
<<<<<<< HEAD
=======
          <button><Link to="/CreateGroup">Créer un groupe</Link></button>
>>>>>>> origin/test_lauric
        </div>
      </header>
      <div className="group-grid">
        {groups.map((group, index) => (
          <GroupCard key={index} name={group.name} image={group.image} />
        ))}
      </div>
    </div>
  );
};

export default Group;
