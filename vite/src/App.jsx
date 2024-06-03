import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Accueil/Accueil';
import ProfilePage from './pages/Profile/Profile';
import Parametres from './pages/Parametres/Parametres';
import HallofFame from './pages/HallofFame/HallofFame';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/Accueil" element={<Home />} />
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/Parametres" element={<Parametres />} />
        <Route path="/HallofFame" element={<HallofFame />} />
      </Routes>
    </Router>
  );
}



export default App;
