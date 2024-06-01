import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import Availability from '../../components/Availability/Availability';
import History from '../../components/History/History';
import FriendsList from '../../components/FriendsList/FriendsList';
import Wishlist from '../../components/Wishlist/Wishlist';
import './Profile.css';

function ProfilePage() {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <div className="Profile">
      <div className="edit-icon-container">
        <FontAwesomeIcon 
          icon={faEdit} 
          onClick={toggleEditMode} 
          className="edit-icon" 
          title={isEditMode ? 'Sauvegarder les modifications' : 'Modifier le profil'}
        />
      </div>
      <ProfileHeader isEditMode={isEditMode} />
      <div className="main-content">
        <Availability isEditMode={isEditMode} />
        <History isEditMode={isEditMode} />
        <FriendsList isEditMode={isEditMode} />
      </div>
      <Wishlist isEditMode={isEditMode} />
    </div>
  );
}

export default ProfilePage;
