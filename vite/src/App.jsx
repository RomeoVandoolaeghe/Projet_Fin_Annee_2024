import React from 'react';

// Importation des composants nécessaires depuis react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importation des composants dans le dossier "components"
import Navbar from './components/Navbar/Navbar.jsx';
import Events from './pages/Events/Events.jsx';
import CreateOutput from './pages/CreateOutput/CreateOutput.jsx';
import Calendar from './pages/Calendars/Calendars.jsx';
import Login from './pages/Login/Login.jsx';
import Chat from './pages/Chat/Chat.jsx';
import Home from './pages/Accueil/Accueil.jsx';
import ProfilePage from './pages/Profile/Profile.jsx';
import Parametres from './pages/Parametres/Parametres.jsx';
import HallofFame from './pages/HallofFame/HallofFame.jsx';
import AddFriend from './pages/AddFriend/AddFriend.jsx';
import Group from './pages/Group/Group.jsx';
import CreateGroup from './pages/CreateGroup/CreateGroup.jsx';
import SideBar from './components/SideBar/SideBar.jsx';
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
        <Route path="/Chat" element={<Chat />} />
        <Route path="/Accueil" element={<Home />} />
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/Group" element={<Group />} />
        <Route path="/Parametres" element={<Parametres />} />
        <Route path="/HallofFame" element={<HallofFame />} />
        <Route path="/AddFriend" element={<AddFriend />} />
        <Route path="/CreateGroup" element={<CreateGroup />} />
      </Routes>
    </Router>
  );
}

export default App;
