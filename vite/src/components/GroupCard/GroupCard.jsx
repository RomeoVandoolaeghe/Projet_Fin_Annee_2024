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

  return (
    <div className="group-card">
      <div className="group-image"> 
        {image}
      </div>
      <div className="group-info">
        <h3><strong>{name}</strong></h3>
        <FaEllipsisV className="group-options" onClick={toggleDropdown} />
        {dropdownVisible && (
          <ul className="dropdown">
            <li> supprimer </li>
            <li>
              <button onClick={() => setShowModal(true)}>
                Details
              </button>{showModal &&
                          createPortal(
                          <DetailGroup closeModal={() => setShowModal(false)} />,
                          document.body
                        )}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default GroupCard;
