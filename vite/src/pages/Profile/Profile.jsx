import React, { useState } from 'react';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import Availability from '../../components/Availability/Availability';
import History from '../../components/History/History';
import FriendsList from '../../components/FriendsList/FriendsList';
import Wishlist from '../../components/Wishlist/Wishlist';
import GroupProfile from '../../components/GroupProfile/GroupProfile';
import './Profile.css';

function ProfilePage() {

  return (
    <div className="Profile">
      <div className="main-content">
        <div className="column">
          <ProfileHeader />
          <Availability />
        </div>
        <div className="column">
          <History />
          <Wishlist />
        </div>
        <div className="column">
          <FriendsList />
          <GroupProfile />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
