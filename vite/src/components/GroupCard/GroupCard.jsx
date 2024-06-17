import React, { useState, useEffect, useRef } from 'react';
import './GroupCard.css';
import { FaEllipsisV } from 'react-icons/fa';
import { createPortal } from 'react-dom';
import DetailGroup from '../../components/DetailGroup/DetailGroup';
import { Link } from 'react-router-dom';

const GroupCard = ({ name, image, color }) => {
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

  return (
    <div className="group-card">
      <div className="group-image" style={{ backgroundColor: color }}>
        {image}
      </div>
      <div className="group-info">
        <Link to="/Chat" className="chat-link">
          <h3><strong>{name}</strong></h3>
        </Link>
        <FaEllipsisV className="group-options" onClick={toggleDropdown} />
        {dropdownVisible && !showModal && (
          <ul className="dropdown" ref={dropdownRef}>
            <li><button>Supprimer</button></li>
            <li>
              <button onClick={handleShowModal}>Détails</button>
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
