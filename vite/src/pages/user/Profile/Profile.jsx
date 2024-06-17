import React, { useState } from 'react';
import ProfileHeader from '../../../components/ProfileHeader/ProfileHeader';
import History from '../../../components/History/History';
import FriendsList from '../../../components/FriendsList/FriendsList';
import Wishlist from '../../../components/Wishlist/Wishlist';
import './Profile.css';

function ProfilePage() {

  return (
    <div className="Profile">
      <div className="main-content">
        <div className="column">
          <ProfileHeader />
        </div>
        <div className="column">
          <History />
          <Wishlist />
        </div>
        <div className="column">
          <FriendsList />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;