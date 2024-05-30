import React, { useState } from 'react';
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
      <button onClick={toggleEditMode}>
        {isEditMode ? 'Sauvegarder les modifications' : 'Modifier le profil'}
      </button>
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
