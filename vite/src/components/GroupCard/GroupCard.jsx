import React, { useState, useEffect, useRef } from 'react';
import './GroupCard.css';
import { FaEllipsisV } from 'react-icons/fa';
import { createPortal } from "react-dom";
import DetailGroup from '../../components/DetailGroup/DetailGroup';
import { Link } from 'react-router-dom';

const GroupCard = ({ name, image }) => {
  // État pour gérer la visibilité du dropdown
  const [dropdownVisible, setDropdownVisible] = useState(false);
  // État pour gérer la visibilité du modal de détails
  const [showModal, setShowModal] = useState(false);
  // Référence pour le dropdown afin de détecter les clics à l'extérieur
  const dropdownRef = useRef(null);

  // Fonction pour basculer la visibilité du dropdown
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Fonction pour afficher le modal et fermer le dropdown
  const handleShowModal = () => {
    setShowModal(true);
    setDropdownVisible(false); // Ferme le dropdown quand le modal s'affiche
  };

  // Fonction pour gérer les clics à l'extérieur du dropdown
  const handleClickOutside = (event) => {
    // Vérifie si le clic s'est produit en dehors du dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  // useEffect pour ajouter et nettoyer l'écouteur d'événements pour les clics à l'extérieur
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    // Nettoyage de l'écouteur d'événements à la désactivation du composant
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="group-card">
      {/* Image du groupe */}
      <div className="group-image"> 
        {image}
      </div>
      {/* Informations du groupe */}
      <div className="group-info">
        {/* Lien vers la page de chat */}
        <Link to="/Chat" className="chat-link">
          <h3><strong>{name}</strong></h3>
        </Link>
        {/* Icône pour afficher les options du groupe */}
        <FaEllipsisV className="group-options" onClick={toggleDropdown} />
        {/* Dropdown des options */}
        {dropdownVisible && !showModal && (
          <ul className="dropdown" ref={dropdownRef}>
            <li><button>Supprimer</button></li>
            <li>
              <button onClick={handleShowModal}>Détails</button>
            </li>
          </ul>
        )}
      </div>
      {/* Modal pour les détails du groupe */}
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
