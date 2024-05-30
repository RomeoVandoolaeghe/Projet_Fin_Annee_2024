import React from 'react';
import './Wishlist.css';

const Wishlist = () => {
  const activities = [
    { activity: "Aller au parc d'attraction", duration: "1 jour", location: "Disneyland Paris" },
    { activity: "Aller au parc d'attraction", duration: "1 jour", location: "Disneyland Paris" },
    { activity: "Aller au parc d'attraction", duration: "1 jour", location: "Disneyland Paris" },
    { activity: "Aller au parc d'attraction", duration: "1 jour", location: "Disneyland Paris" },
    { activity: "Aller au parc d'attraction", duration: "1 jour", location: "Disneyland Paris" },
  ];

  return (
    <div className="wishlist-container">
      <h2>Ma Wishlist</h2>
      <table className="wishlist-table">
        <thead>
          <tr>
            <th>Activités</th>
            <th>Durée</th>
            <th>Lieu</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((item, index) => (
            <tr key={index}>
              <td>{item.activity}</td>
              <td>{item.duration}</td>
              <td>{item.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Wishlist;
