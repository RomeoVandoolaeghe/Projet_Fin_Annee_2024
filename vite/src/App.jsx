import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import Events from './pages/user/Events/Events.jsx';
import CreateOutput from './pages/user/CreateOutput/CreateOutput.jsx';
import Calendar from './pages/user/Calendars/Calendars.jsx';
import Login from './pages/Login/Login.jsx';
import Chat from './pages/user/CHAT/CHAT.jsx';
import Home from './pages/user/Accueil/Accueil.jsx';
import ProfilePage from './pages/user/Profile/Profile.jsx';
import Parametres from './pages/user/Parametres/Parametres.jsx';
import HallofFame from './pages/user/HallofFame/HallofFame.jsx';
import AddFriend from './pages/user/AddFriend/AddFriend.jsx';
import Group from './pages/user/Group/Group.jsx';
import CreateGroup from './pages/user/CreateGroup/CreateGroup.jsx';
import SideBar from './components/Sidebar/Sidebar.jsx';
import accueil_admin from './pages/admin/accueil-admin/accueil-admin.jsx';                   
// Importation des styles globaux de l'application

import "./App.css"

function App() {
  return (
    <Router>
      {/* Afficher du logo,de la barre de navigation et de la barre latérale seulement sur toute les pages sauf la page de login */}
      {window.location.pathname !== '/' && <div className="logo"><img src="logo.png" alt="Logo du site" /></div>}
      {window.location.pathname !== '/' && <Navbar />}
      {window.location.pathname !== '/' && <SideBar />}
      <Routes>
        {/* Définition des différentes routes */}
        <Route path='/' element={<Login />} />
        <Route path='/CreateOutput' element={<CreateOutput />} />
        <Route path="/Events" element={<Events />} />
        <Route path='/Calendar' element={<Calendar />} />
        <Route path="/CHAT" element={<Chat />} />
        <Route path="/Accueil" element={<Home />} />
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/Group" element={<Group />} />
        <Route path="/Parametres" element={<Parametres />} />
        <Route path="/HallofFame" element={<HallofFame />} />
        <Route path="/AddFriend" element={<AddFriend />} />
        <Route path="/CreateGroup" element={<CreateGroup />} />
        <Route path="/accueil-admin" element={<accueil_admin />} />
      </Routes>
    </Router>
  );
}

export default App;
