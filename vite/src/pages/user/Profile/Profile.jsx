// Importation des bibliothèques nécessaires
import React, { useEffect } from 'react';
import ProfileHeader from '../../../components/ProfileHeader/ProfileHeader';
import History from '../../../components/History/History';
import FriendsList from '../../../components/FriendsList/FriendsList';
import './Profile.css';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import Navbar from '../../../components/Navbar/Navbar';

// Composant ProfilePage
function ProfilePage({ profileImage }) {

  // Utilisation de useEffect pour vérifier l'accès à la page
  useEffect(() => {
    axios.post("http://localhost:3000/acces", "", { withCredentials: true })
      .then(response => {
        console.log('Réponse de la requête POST:', response);
        if (response.status === 201) {
          // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
          console.log("Vous n'êtes pas connecté");
          alert('Veuillez vous connecter pour accéder à cette page');
          window.location.href = 'http://localhost:5173';
        } else {
          // Si l'utilisateur est connecté, afficher un message dans la console
          console.log('Vous êtes connecté');
        }
      })
      .catch(error => {
        // Gestion des erreurs de la requête POST
        console.error('Erreur lors de la requête POST:', error);
      });
  }, []);

  // Rendu du composant
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

// Exportation du composant ProfilePage
export default ProfilePage;
