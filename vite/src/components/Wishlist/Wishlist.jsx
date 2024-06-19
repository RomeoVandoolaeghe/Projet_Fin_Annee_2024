import React, { useState } from 'react';
import '../../pages/user/WishlistActivity/WishlistActivity';
import './Wishlist.css';
import { Link } from 'react-router-dom';

const initialActivities = [
  { activity: "Aller au parc d'attraction", duration: "1 jour", location: "Disneyland Paris" },
  { activity: "Aller au parc d'attraction", duration: "1 jour", location: "Disneyland Paris" },
  { activity: "Aller au parc d'attraction", duration: "1 jour", location: "Disneyland Paris" },
  { activity: "Aller au parc d'attraction", duration: "1 jour", location: "Disneyland Paris" },
  { activity: "Aller au parc d'attraction", duration: "1 jour", location: "Disneyland Paris" },
];

const Wishlist = () => {
  const [activities, setActivities] = useState(initialActivities);

  return (
    <div className="wishlist-container">
      <div className="header-container">
        <h3>Ma Wishlist</h3>
        <Link to="/WishlistActivity" className="button_2">
          <button className="add-button">Ajouter une sortie </button>
        </Link>
      </div>
      <table className="wishlist-table">
        <thead>
          <tr>
            <th>Sortie</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((item, index) => (
            <tr key={index}>
              <td>{item.activity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Wishlist;
