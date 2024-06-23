// GroupCard.js
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { createPortal } from 'react-dom';
import DetailGroup from '../../components/DetailGroup/DetailGroup';
import { Link } from 'react-router-dom';
import './GroupCard.css';

// Définition du composant GroupCard
const GroupCard = ({ id, name, image, color, onDelete, onClick }) => {
  // État pour gérer la visibilité du menu déroulant
  const [dropdownVisible, setDropdownVisible] = useState(false);
  // État pour gérer la visibilité de la fenêtre modale
  const [showModal, setShowModal] = useState(false);
  // Référence à l'élément du menu déroulant
  const dropdownRef = useRef(null);

  // Fonction pour basculer la visibilité du menu déroulant
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Fonction pour afficher la fenêtre modale et masquer le menu déroulant
  const handleShowModal = () => {
    setShowModal(true);
    setDropdownVisible(false);
  };

  // Fonction pour gérer les clics à l'extérieur du menu déroulant et le masquer
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  // Utilisation de useEffect pour ajouter un écouteur d'événements lors du montage du composant et le supprimer lors du démontage
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fonction pour gérer la suppression d'un groupe
  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(id);
  };

  return (
    <div className="group-card" onClick={() => onClick(id, name)}>
      <FontAwesomeIcon
        icon={faEllipsisV}
        className="group-options"
        onClick={(e) => {
          e.stopPropagation(); // Empêche la propagation du clic
          toggleDropdown();
        }}
      />
      <Link to="/Chat" className="chat-link">
        <div className="group-info">
          <h3><strong>{name}</strong></h3>
          {dropdownVisible && !showModal && (
            <ul className="dropdown" ref={dropdownRef}>
              <li><button onClick={handleDelete}>Supprimer</button></li>
              <li>
                <button onClick={handleShowModal}>Détails</button>
              </li>
            </ul>
          )}
        </div>
      </Link>
      {showModal &&
        createPortal(
          <DetailGroup closeModal={() => setShowModal(false)} />,
          document.body
        )
      }
    </div>
  );
};

export default GroupCard;
