import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Events from './pages/Events/Events.jsx';
import CreateOutput from './pages/CreateOutput/CreateOutput.jsx';
import Calendar from './pages/Calendars/Calendars.jsx';
import Login from './pages/Login/Login.jsx';
import Chat from './pages/Chat/Chat.jsx';

function App() {
  return (
    <Router>
      {window.location.pathname !== '/' && <Navbar />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/CreateOutput' element={<CreateOutput />} />
        <Route path="/Events" element={<Events />} />
        <Route path='/Calendar' element={<Calendar />} />
        <Route path="/Chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
