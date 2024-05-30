import React from 'react';
import Profile from './components/ProfileHeader/ProfileHeader';
import Availability from './components/Availability/Availability';
import History from './components/History/History';
import FriendsList from './components/FriendsList/FriendsList';

function Profile() {
  return (
    <div className="app">
      <ProfileHeader />
      <div className="main-content">
        <Availability />
        <History />
        <FriendsList />
      </div>
    </div>
  );
}

export default Profile;
