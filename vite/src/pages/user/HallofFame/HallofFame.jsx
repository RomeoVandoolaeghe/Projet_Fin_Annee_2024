import React, { useEffect, useState } from 'react';
import MostFrequentFriends from '../../../components/MostFrequentFriends/MostFrequentFriends';
import MostFrequentPlaces from '../../../components/MostFrequentPlaces/MostFrequentPlaces';
import ParticipationStats from '../../../components/ParticipationStats/ParticipationStats';
import CircularProgressWithLabel from '../../../components/CircularProgressWithLabel/CircularProgressWithLabel';
import { FaTrophy } from 'react-icons/fa';
import './HallofFame.css';
import Navbar from '../../../components/Navbar/Navbar';
import axios from 'axios';

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
  totalEvents: 0,
  organizedEvents: 0,
  participationRate: 0,
  badges: ['Organisateur expert', 'Amateur de cafés'],
};

const HallOfFame = () => {
  const [userStats, setUserStats] = useState(initialUserStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get_statistics', { withCredentials: true });
        const { totalSorties, evenementsOrganises, tauxParticipation } = response.data;
        setUserStats(prevStats => ({
          ...prevStats,
          totalEvents: totalSorties,
          organizedEvents: evenementsOrganises,
          participationRate: Math.round(tauxParticipation), // Arrondir le taux de participation à un entier
        }));
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
        setLoading(false);
      }
    };

    fetchUserStats();
  }, []);


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
