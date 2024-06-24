// GroupCard.js
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { createPortal } from 'react-dom';
import DetailGroup from '../../components/DetailGroup/DetailGroup';
import { Link } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';
import axios from 'axios'; // Importer axios
import './GroupCard.css';

const GroupCard = ({ id, name, image, color, onDelete, onClick }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleShowModal = () => {
    setShowModal(true);
    setDropdownVisible(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      // Faire une requête DELETE à l'API pour supprimer l'élément
      await axios.delete(`/api/groups/${id}`);
      // Appeler la fonction onDelete pour mettre à jour l'état dans le composant parent
      onDelete(id);
    } catch (error) {
      console.error('Erreur lors de la suppression du groupe:', error);
    }
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
          <p><FaUsers size={30} /></p>
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
