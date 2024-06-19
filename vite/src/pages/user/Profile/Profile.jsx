import React, { useState } from 'react';
import ProfileHeader from '../../../components/ProfileHeader/ProfileHeader';
import History from '../../../components/History/History';
import FriendsList from '../../../components/FriendsList/FriendsList';
import './Profile.css';
import { FaUser } from 'react-icons/fa';

function ProfilePage() {

  return (
    <>
    <div className='header'>
      <h3>
        Profil <FaUser size={15} />
      </h3>
    </div>
      <div className="Profile">
        <div className="main-content">
          <div className="column">
            <ProfileHeader />
          </div>
          <div className="column">
            <History />
          </div>
          <div className="column">
            <FriendsList />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;