import React from 'react';
import MostFrequentFriends from '../../components/MostFrequentFriends/MostFrequentFriends';
import MostFrequentPlaces from '../../components/MostFrequentPlaces/MostFrequentPlaces'
import ParticipationStats from '../../components/ParticipationStats/ParticipationStats';
import './HallofFame.css';

const userStats = {
  mostFrequentFriends: [
    { name: 'Alice', times: 5 },
    { name: 'Bob', times: 4 },
  ],
  mostFrequentPlaces: [
    { name: 'Café de Paris', times: 3 },
    { name: 'Parc Central', times: 2 },
  ],
  totalEvents: 10,
  organizedEvents: 4,
  participationRate: 80,
  badges: ['Organisateur expert', 'Amateur de cafés'],
};

const HallOfFame = () => {
  return (
    <div className="hall-of-fame">
      <h2>Hall of Fame</h2>
      <MostFrequentFriends friends={userStats.mostFrequentFriends} />
      <MostFrequentPlaces places={userStats.mostFrequentPlaces} />
      <ParticipationStats 
        totalEvents={userStats.totalEvents} 
        organizedEvents={userStats.organizedEvents} 
        participationRate={userStats.participationRate} 
      />
    </div>
  );
};

export default HallOfFame;
