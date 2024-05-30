import React from 'react';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import Availability from '../../components/Availability/Availability';
import History from '../../components/History/History';
import FriendsList from '../../components/FriendsList/FriendsList';
import './Profile.css';

function ProfilePage() {
  return (
    <div className="Profile">
      <ProfileHeader />
      <div className="main-content">
        <Availability />
        <History />
        <FriendsList />
      </div>
    </div>
  );
}

export default ProfilePage;
