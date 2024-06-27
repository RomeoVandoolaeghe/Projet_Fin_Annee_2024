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
  mostFrequentFriends: [],
  mostFrequentPlaces: [],
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
        const [statsResponse, friendsResponse, placesResponse] = await Promise.all([
          axios.get('http://localhost:3000/get_statistics', { withCredentials: true }),
          axios.get('http://localhost:3000/get_top_friends', { withCredentials: true }),
          axios.get('http://localhost:3000/get_top_places', { withCredentials: true })
        ]);

        console.log('Stats Response:', statsResponse.data);
        console.log('Friends Response:', friendsResponse.data);
        console.log('Places Response:', placesResponse.data);

        const { totalSorties, evenementsOrganises, tauxParticipation } = statsResponse.data;
        const mostFrequentFriends = friendsResponse.data.map((friend, index) => ({
          name: friend.name,
          times: friend.participation_count,
          img: index === 0 ? 'hall_of_fame_1.jpg' : index === 1 ? 'hall_of_fame_2.jpg' : 'hall_of_fame_3.jpg'
        }));

        const mostFrequentPlaces = placesResponse.data.map((place, index) => ({
          name: place.place,
          times: place.visit_count,
          img: index === 0 ? 'hall_of_fame_1.jpg' : index === 1 ? 'hall_of_fame_2.jpg' : 'hall_of_fame_2.jpg'
        }));

        setUserStats(prevStats => ({
          ...prevStats,
          totalEvents: totalSorties,
          organizedEvents: evenementsOrganises,
          participationRate: Math.round(tauxParticipation), // Arrondir le taux de participation à un entier
          mostFrequentFriends: mostFrequentFriends,
          mostFrequentPlaces: mostFrequentPlaces
        }));
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
        setLoading(false);
      }
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
            <p>Chargement des informations...</p>
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
