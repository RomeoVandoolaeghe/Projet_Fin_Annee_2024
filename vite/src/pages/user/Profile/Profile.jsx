import React, { useEffect } from 'react';
import ProfileHeader from '../../../components/ProfileHeader/ProfileHeader';
import History from '../../../components/History/History';
import FriendsList from '../../../components/FriendsList/FriendsList';
import './Profile.css';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import Navbar from '../../../components/Navbar/Navbar';

function ProfilePage({ profileImage }) {

  useEffect(() => {
    axios.post("http://localhost:3000/acces", "", { withCredentials: true })
      .then(response => {
        console.log('Réponse de la requête POST:', response);
        if (response.status === 201) {
          console.log("Vous n'êtes pas connecté");
          alert('Veuillez vous connecter pour accéder à cette page');
          window.location.href = 'http://localhost:5173';
        } else {
          console.log('Vous êtes connecté');
        }
      })
      .catch(error => {
        console.error('Erreur lors de la requête POST:', error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className='header'>
        <h3>
          Profil <FaUser size={15} />
        </h3>
      </div>
      <div className="Profile">
        <div className="main-content">
          <div className="column">
            <ProfileHeader profileImage={profileImage} />
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
