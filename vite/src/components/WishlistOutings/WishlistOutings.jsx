import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import './WishlistOutings.css';
import { Link } from 'react-router-dom';

const initialOutings = [
  { activity: "Aller au parc d'attraction", duration: "1 jour", location: "Disneyland Paris" },
  { activity: "Aller à la plage", duration: "1 jour", location: "Nice" },
  { activity: "Visiter un musée", duration: "1/2 jour", location: "Louvre, Paris" },
  { activity: "Faire du ski", duration: "2 jours", location: "Alpes" },
  { activity: "Randonnée en montagne", duration: "1 jour", location: "Pyrénées" },
];

const WishlistOutings = () => {
  const [outings, setOutings] = useState(initialOutings);
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);

  const handleDeleteClick = (index) => {
    setOutings(outings.filter((outing, i) => i !== index));
  };

  const toggleDeleteButtons = () => {
    setShowDeleteButtons(!showDeleteButtons);
  };

  return (
    <div>
      <div className="list-container friends-list">
        <div className="friends-list-header">
          <h4>Ma Wishlist</h4>
          <button className="toggle-delete" onClick={toggleDeleteButtons}>
            {showDeleteButtons ? 'Annuler' : 'Gérer'}
          </button>
        </div>
        <ul>
          {outings.map((outing, index) => (
            <li key={index}>
              <div>
                <strong>Activité:</strong> {outing.activity}<br />
                <strong>Durée:</strong> {outing.duration}<br />
                <strong>Lieu:</strong> {outing.location}
              </div>
              {showDeleteButtons ? (
                <FaTrashAlt
                  className="icon delete"
                  onClick={() => handleDeleteClick(index)}
                />
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WishlistOutings;
