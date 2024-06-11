import React from 'react';
import MostFrequentFriends from '../../components/MostFrequentFriends/MostFrequentFriends';
import MostFrequentPlaces from '../../components/MostFrequentPlaces/MostFrequentPlaces';
import ParticipationStats from '../../components/ParticipationStats/ParticipationStats';
import './HallofFame.css';

const userStats = {
  mostFrequentFriends: [
    { name: 'Hugo', times: 5, img: 'amis1.jpg' },
    { name: 'Bob', times: 4, img: 'amis1.jpg' },
    { name: 'Samuel', times: 3, img: 'amis1.jpg' },
    { name: 'Ariel', times: 3, img: 'amis1.jpg' },
    { name: 'Will', times: 3, img: 'amis1.jpg' },
    { name: 'Louis', times: 2, img: 'amis1.jpg' },
    { name: 'Axel', times: 2, img: 'amis1.jpg' },
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
  return (
    <div className="hall-of-fame">
      <h3>Hall of Fame</h3>
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
