import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HallOfFame from './pages/HallOfFame';
import Profile from './pages/Profile';
import Navbar from './components/Navbar/Navbar';
import Accueil from './pages/Accueil'
import Groupe from './pages/Groupe';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/Accueil" element={<Accueil />} />
        <Route path="/Groupe" element={<Groupe />} />
        <Route path="/Halloffame" element={<HallOfFame />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
