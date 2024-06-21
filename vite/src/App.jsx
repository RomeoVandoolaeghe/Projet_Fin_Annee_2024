import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Events from './pages/user/Events/Events.jsx';
import CreateOutput from './pages/user/CreateOutput/CreateOutput.jsx';
import Login from './pages/Login/Login.jsx';
import Chat from './pages/user/CHAT/CHAT.jsx';
import Home from './pages/user/Accueil/Accueil.jsx';
import ProfilePage from './pages/user/Profile/Profile.jsx';
import Parametres from './pages/user/Parametres/Parametres.jsx';
import HallofFame from './pages/user/HallofFame/HallofFame.jsx';
import AddFriend from './pages/user/AddFriend/AddFriend.jsx';
import Group from './pages/user/Group/Group.jsx';
import CreateGroup from './pages/user/CreateGroup/CreateGroup.jsx';
import AccueilAdmin from './pages/admin/AccueilAdmin/AccueilAdmin.jsx';
import SideBar from './components/Sidebar/Sidebar.jsx';
import './App.css';

export const UserContext = createContext(null);

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function App() {
  const [groups, setGroups] = useState([
    { name: 'ASTRO WORD', image: ' A ', color: getRandomColor() },
  ]);
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState('');

  const addGroup = (groupName, users) => {
    const newGroup = {
      id: groups.length + 1,
      name: groupName,
      users: users.split(',').map(user => user.trim()),
      image: groupName.charAt(0).toUpperCase(),
      color: getRandomColor(),
    };
    setGroups([...groups, newGroup]);
  };

  const handleImageSelect = (image) => {
    setProfileImage(image);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/CreateOutput' element={<CreateOutput />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/CHAT" element={<Chat />} />
          <Route path="/Accueil" element={<Home />} />
          <Route path="/Profile" element={<ProfilePage profileImage={profileImage} />} />
          <Route path="/Group" element={<Group groups={groups} />} />
          <Route path="/Parametres" element={<Parametres onImageSelect={handleImageSelect} />} />
          <Route path="/HallofFame" element={<HallofFame />} />
          <Route path="/AddFriend" element={<AddFriend />} />
          <Route path="/CreateGroup" element={<CreateGroup onCreateGroup={addGroup} />} />
          <Route path="/AccueilAdmin" element={<AccueilAdmin />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
