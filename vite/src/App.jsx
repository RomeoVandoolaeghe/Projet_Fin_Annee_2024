import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Accueil/Accueil';
import ProfilePage from './pages/Profile/Profile';
import Parametres from './pages/Parametres/Parametres';
import HallofFame from './pages/HallofFame/HallofFame';
import AddFriend from './pages/AddFriend/AddFriend';
import Group from './pages/Group/Group';
import Chat from './pages/Chat/Chat'
import CreateGroup from './pages/CreateGroup/CreateGroup';
import SideBar from './components/SideBar/SideBar';
import Navbar from './components/Navbar/Navbar'
import './App.css';
function App() {
  return (
    <Router>
      <div className="logo"><img src="logo.png" alt="Logo du site" /></div>
      <Navbar />
      <SideBar />
      <Routes>
        <Route path="/Accueil" element={<Home />} />
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/Group" element={<Group />} />
        <Route path="/Parametres" element={<Parametres />} />
        <Route path="/HallofFame" element={<HallofFame />} />
        <Route path="/AddFriend" element={<AddFriend />} />
        <Route path="/CreateGroup" element={<CreateGroup />} />
        <Route path="/Chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}



export default App;
