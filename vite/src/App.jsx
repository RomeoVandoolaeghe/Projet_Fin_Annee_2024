import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Events from './pages/Events/Events.jsx';
import CreateOutput from './pages/CreateOutput/CreateOutput.jsx';
import Calendar from './pages/Calendars/Calendars.jsx';
import Login from './pages/Login/Login.jsx';
import Chat from './pages/Chat/Chat.jsx';
import SideBar from './components/SideBar/SideBar.jsx';
import Home from './pages/Accueil/Accueil';
import ProfilePage from './pages/Profile/Profile';
import Parametres from './pages/Parametres/Parametres';
import HallofFame from './pages/HallofFame/HallofFame';
import AddFriend from './pages/AddFriend/AddFriend';
import Group from './pages/Group/Group';
import CreateGroup from './pages/CreateGroup/CreateGroup';

function App() {
  return (
    <Router>
      <SideBar />
      <Routes>
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
