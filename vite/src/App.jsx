import React, { useEffect,useState, createContext } from 'react';
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
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchGroupe = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3000/recup_group', { withCredentials: true });
  //       if (response.data && Array.isArray(response.data)) {
  //         setGroups(response.data); // Mise à jour de groupList avec les données de l'API
  //       } else {
  //         console.error('Les données reçues ne sont pas valides', response.data);
  //       }
  //     } catch (error) {
  //       setError(error);
  //     }
  //   };

  //   fetchGroupe();
  // }, []);

  const [user, setUser] = useState(null);

  const addGroup = (groupName, users) => {
    const newGroup = {
      id: groups.length + 1,
      name: groupName,
      users: users.split(',').map(user => user.trim()), // Convertir les utilisateurs en tableau
      image: groupName.charAt(0).toUpperCase(), // Juste une logique pour l'image, vous pouvez la changer
      color: getRandomColor(), // Ajouter une couleur aléatoire
    };
    setGroups([...groups, newGroup]);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        {window.location.pathname !== '/' && <div className="logo"><img src="logo.png" alt="Logo du site" /></div>}
        {window.location.pathname !== '/' && <Navbar />}
        {/* {window.location.pathname !== '/' && <SideBar />} */}
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/CreateOutput' element={<CreateOutput />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/CHAT" element={<Chat />} />
          <Route path="/Accueil" element={<Home />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/Group" element={<Group groups={groups} />} />
          <Route path="/Parametres" element={<Parametres />} />
          <Route path="/HallofFame" element={<HallofFame />} />
          <Route path="/AddFriend" element={<AddFriend />} />
          <Route path="/CreateGroup" element={<CreateGroup onCreateGroup={addGroup} />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
