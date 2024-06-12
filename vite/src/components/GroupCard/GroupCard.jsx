import React, { useState } from 'react';
import './GroupCard.css';
import { FaEllipsisV } from 'react-icons/fa';
import { createPortal } from "react-dom";
import DetailGroup from '../../components/DetailGroup/DetailGroup';

const GroupCard = ({ name, image }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleShowModal = () => {
    setShowModal(true);
    setDropdownVisible(false); // Ferme le dropdown quand le modal s'affiche
  };

  return (
    <div className="group-card">
      <div className="group-image"> 
        {image}
      </div>
      <div className="group-info">
        <h3><strong>{name}</strong></h3>
        <FaEllipsisV className="group-options" onClick={toggleDropdown} />
        {dropdownVisible && !showModal && (
          <ul className="dropdown">
            <li><button> supprimer </button></li>
            <li>
              <button onClick={handleShowModal}>
                Details
              </button>
            </li>
          </ul>
        )}
      </div>
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
