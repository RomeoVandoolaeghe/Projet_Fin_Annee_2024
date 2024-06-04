import React, { useState } from 'react';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import Availability from '../../components/Availability/Availability';
import History from '../../components/History/History';
import FriendsList from '../../components/FriendsList/FriendsList';
import Wishlist from '../../components/Wishlist/Wishlist';
import GroupProfile from '../../components/GroupProfile/GroupProfile';
import { Link } from 'react-router-dom';
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
          <button><Link to="/AddFriend">Ajouter un amis</Link></button>
          <GroupProfile />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
