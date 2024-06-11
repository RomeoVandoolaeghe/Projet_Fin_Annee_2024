import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './GroupCard.css';
import { FaEllipsisV } from 'react-icons/fa';

const GroupCard = ({ name, image }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

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
            <li> modifier </li>
            <li> Details </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default GroupCard;
