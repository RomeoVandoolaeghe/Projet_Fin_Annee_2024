import React, { useEffect, useState } from 'react';
import MostFrequentFriends from '../../../components/MostFrequentFriends/MostFrequentFriends';
import MostFrequentPlaces from '../../../components/MostFrequentPlaces/MostFrequentPlaces';
import ParticipationStats from '../../../components/ParticipationStats/ParticipationStats';
import CircularProgressWithLabel from '../../../components/CircularProgressWithLabel/CircularProgressWithLabel';
import { FaTrophy } from 'react-icons/fa';
import './HallofFame.css';
import Navbar from '../../../components/Navbar/Navbar';

const initialUserStats = {
  mostFrequentFriends: [
    { name: 'Hugo', times: 5, img: 'amis1.jpg' },
    { name: 'Robert', times: 4, img: 'amis1.jpg' },
    { name: 'Yanelle', times: 3, img: 'amis1.jpg' },
  ],
  mostFrequentPlaces: [
    { name: 'Café de Paris', times: 3, img: 'lieu1.jpeg' },
    { name: 'Parc Central', times: 2, img: 'lieu2.jpg' },
  ],
  totalEvents: 10,
  organizedEvents: 4,
  participationRate: 80,
  badges: ['Organisateur expert', 'Amateur de cafés'],
};

const HallOfFame = () => {
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler une requête à la base de données
    const fetchUserStats = async () => {
      // Simuler un délai de chargement
      setTimeout(() => {
        setUserStats(initialUserStats);
        setLoading(false);
      }, 1000);
    };

    fetchUserStats();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className='header'>
          <h2>Hall of Fame <FaTrophy /></h2>
        </div>
        <div className="hall-of-fame">
          <div className="loading-section">
            <CircularProgressWithLabel value={0} />
            <p>Chargement des amis les plus fréquentés...</p>
          </div>
          <div className="loading-section">
            <CircularProgressWithLabel value={0} />
            <p>Chargement des lieux les plus fréquentés...</p>
          </div>
          <div className="loading-section">
            <CircularProgressWithLabel value={0} />
            <p>Chargement des statistiques de participation...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className='header'>
        <h2>Hall of Fame <FaTrophy /></h2>
      </div>
      <div className="hall-of-fame">
        <MostFrequentFriends friends={userStats.mostFrequentFriends} />
        <MostFrequentPlaces places={userStats.mostFrequentPlaces} />
        <ParticipationStats
          totalEvents={userStats.totalEvents}
          organizedEvents={userStats.organizedEvents}
          participationRate={userStats.participationRate}
        />
      </div>
    </>
  );
};

export default HallOfFame;
