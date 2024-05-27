import React from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import UpcomingEvents from './components/UpcomingEvents/upcomingevents';
import Profile from "./pages/profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <UpcomingEvents />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/group" element={<Group />} />
          <Route path="/hall-of-fame" element={<HallOfFame />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
