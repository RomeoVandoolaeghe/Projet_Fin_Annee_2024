import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { createPortal } from 'react-dom';
import DetailGroup from '../../components/DetailGroup/DetailGroup';
import { Link } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';
import axios from 'axios';
import './GroupCard.css';

const GroupCard = ({ id, name, onDelete, onClick }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
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
      // Faire une requête POST à l'API pour supprimer le groupe
      const url = 'http://localhost:3000/delete_group';
      const response = await axios.post(url, { id }, { withCredentials: true });
      console.log('Réponse de suppression:', response.data);
      onDelete(id); // Appeler onDelete pour mettre à jour l'état dans le composant parent
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
              <li>
                <button onClick={handleDelete}>Supprimer</button>
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
