import React, { useState } from 'react';
import './Wishlist.css';

const initialActivities = [
  { activity: "Aller au parc d'attraction", duration: "1 jour", location: "Disneyland Paris" },
  { activity: "Aller au parc d'attraction", duration: "1 jour", location: "Disneyland Paris" },
  { activity: "Aller au parc d'attraction", duration: "1 jour", location: "Disneyland Paris" },
  { activity: "Aller au parc d'attraction", duration: "1 jour", location: "Disneyland Paris" },
  { activity: "Aller au parc d'attraction", duration: "1 jour", location: "Disneyland Paris" },
];

const Wishlist = ({ isEditMode }) => {
  const [activities, setActivities] = useState(initialActivities);

  const handleInputChange = (index, field, value) => {
    const newActivities = [...activities];
    newActivities[index][field] = value;
    setActivities(newActivities);
  };

  const handleAddActivity = () => {
    const newActivity = { activity: "", duration: "", location: "" };
    setActivities([...activities, newActivity]);
  };

  return (
    <div className="wishlist-container">
      <div className="header-container">
        <h3>Ma Wishlist</h3>
        <button className="add-button" onClick={handleAddActivity}>Ajouter une activité + </button>
      </div>
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
              <td>
                {isEditMode ? (
                  <input
                    type="text"
                    value={item.activity}
                    onChange={(e) => handleInputChange(index, 'activity', e.target.value)}
                  />
                ) : (
                  item.activity
                )}
              </td>
              <td>
                {isEditMode ? (
                  <input
                    type="text"
                    value={item.duration}
                    onChange={(e) => handleInputChange(index, 'duration', e.target.value)}
                  />
                ) : (
                  item.duration
                )}
              </td>
              <td>
                {isEditMode ? (
                  <input
                    type="text"
                    value={item.location}
                    onChange={(e) => handleInputChange(index, 'location', e.target.value)}
                  />
                ) : (
                  item.location
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
</div>

  );
}

export default Wishlist;
