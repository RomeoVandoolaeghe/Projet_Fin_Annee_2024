import React, { useState } from 'react';
import '../../pages/user/WishlistActivity/WishlistActivity'
import './Wishlist.css';
import { Link } from 'react-router-dom'; 

const initialActivities = [
  { activity: "Aller au parc d'attraction", duration: "1 jour", location: "Disneyland Paris" },
  { activity: "Aller au parc d'attraction", duration: "1 jour", location: "Disneyland Paris" },
  { activity: "Aller au parc d'attraction", duration: "1 jour", location: "Disneyland Paris" },
  { activity: "Aller au parc d'attraction", duration: "1 jour", location: "Disneyland Paris" },
  { activity: "Aller au parc d'attraction", duration: "1 jour", location: "Disneyland Paris" },
];

const Wishlist = ({ isEditMode }) => {
  const [activities, setActivities] = useState(initialActivities);
  const [newActivity, setNewActivity] = useState({ activity: "", duration: "", location: "" });

  const handleInputChange = (index, field, value) => {
    const newActivities = [...activities];
    newActivities[index][field] = value;
    setActivities(newActivities);
  };

  const handleNewActivityChange = (field, value) => {
    setNewActivity({
      ...newActivity,
      [field]: value
    });
  };

  const handleAddActivity = () => {
    setActivities([...activities, newActivity]);
    setNewActivity({ activity: "", duration: "", location: "" });
  };

  return (
    <div className="wishlist-container">
      <div className="header-container">
        <h3>Ma Wishlist</h3>
        <Link to="/WishlistActivity" className='button_2'><button className="add-button" onClick={handleAddActivity}>Ajouter une activité + </button></Link>
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
          {isEditMode && (
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Nouvelle activité"
                  value={newActivity.activity}
                  onChange={(e) => handleNewActivityChange('activity', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Durée"
                  value={newActivity.duration}
                  onChange={(e) => handleNewActivityChange('duration', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Lieu"
                  value={newActivity.location}
                  onChange={(e) => handleNewActivityChange('location', e.target.value)}
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Wishlist;
