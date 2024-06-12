import React,{ useEffect} from 'react';
import ScrollReveal from 'scrollreveal';
import './Group.css';
import { Link } from 'react-router-dom';
import GroupCard from '../../components/GroupCard/GroupCard';
import { FaBars, FaUser, FaHome, FaCalendarAlt, FaUsers, FaTrophy, FaCog, FaSignOutAlt } from 'react-icons/fa';

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

  useEffect(() => {
    // Configuration de base de ScrollReveal
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '20px',
      duration: 500,
      delay: 100,
      reset: true, // Animation réapparaît à chaque défilement
    });

    // Appliquer l'animation aux éléments avec la classe "reveal"
    sr.reveal('.reveal');
  }, []);

  return (
    <>
      <div className='header reveal'>
        <h2>Groupe</h2>
      </div>
      <div className="group-page reveal">
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
