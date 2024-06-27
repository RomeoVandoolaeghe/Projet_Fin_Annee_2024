import React, { useState } from 'react';
import SearchBar from '../../../components/SearchBar/SearchBar';
import FriendList_AddFriend from '../../../components/FriendList_AddFriend/FriendList_AddFriend';
import './AddFriend.css';
import Navbar from '../../../components/Navbar/Navbar';
import axios from 'axios';


const AddFriend = () => {

  axios.post("http://localhost:3000/acces", "", { withCredentials: true })
    .then(response => {
      console.log('Réponse de la requête POST:', response);
      if (response.status === 201) {
        window.location.href = 'http://localhost:5173';
        alert('Veuillez vous connecter pour accéder à cette page')
      }


    })
    .catch(error => {
      console.error('Erreur lors de la requête POST:', error);
    });





  // const [searchTerm, setSearchTerm] = useState('');
  // const [friends, setFriends] = useState([
  //   { name: 'Ragnar Lodbrok', status: 'online' },
  //   { name: 'Harald Hardrada', status: 'offline' },
  //   { name: 'Thorfinn Karlsefni', status: 'online' },
  //   { name: 'Thors Karlsefni', status: 'online' },
  //   { name: 'Leif Erikson', status: 'online' },
  //   { name: 'Thorkell Le Grand', status: 'online' },
  //   { name: 'Knut Le Grand', status: 'offline' },
  //   { name: 'Kjetill Eriksson', status: 'online' },
  // ]);
  // const [requests, setRequests] = useState([]);
  // const [notifications, setNotifications] = useState([]);

  // const handleSearch = (term) => {
  //   setSearchTerm(term);
  //   // Logique pour rechercher des amis
  //   // setFriends(resultatsDeRecherche);
  // };

  return (
    <>
      <Navbar />
      <div className='add-friend'>
        <h3>Ajouter des amis</h3>
        <SearchBar />
        <FriendList_AddFriend />
      </div>
    </>
  );
};

export default AddFriend;
