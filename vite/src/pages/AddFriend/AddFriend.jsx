import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import FriendsList from '../../components/FriendsList/FriendsList';
import './AddFriend.css';

const AddFriend = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [friends, setFriends] = useState([
    { name: 'Ragnar Lodbrok', status: 'online' },
    { name: 'Harald Hardrada', status: 'offline' },
    { name: 'Thorfinn Karlsefni', status: 'online' },
    { name: 'Thors Karlsefni', status: 'online' },
    { name: 'Leif Erikson', status: 'online' },
    { name: 'Thorkell Le Grand', status: 'online' },
    { name: 'Knut Le Grand', status: 'offline' },
    { name: 'Kjetill Eriksson', status: 'online' },
  ]);
  const [requests, setRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Logique pour rechercher des amis
    // setFriends(resultatsDeRecherche);
  };

  return (
    <div>
      <h3>Ajouter des amis</h3>
      <SearchBar onSearch={handleSearch} />
      <FriendsList friends={friends} />
    </div>
  );
};

export default AddFriend;
