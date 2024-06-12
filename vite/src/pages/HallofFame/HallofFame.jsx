import React,{ useEffect} from 'react';
import ScrollReveal from 'scrollreveal';
import MostFrequentFriends from '../../components/MostFrequentFriends/MostFrequentFriends';
import MostFrequentPlaces from '../../components/MostFrequentPlaces/MostFrequentPlaces';
import ParticipationStats from '../../components/ParticipationStats/ParticipationStats';
import { FaBars, FaUser, FaHome, FaCalendarAlt, FaUsers, FaTrophy, FaCog, FaSignOutAlt } from 'react-icons/fa';
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

  useEffect(() => {
    // Configuration de base de ScrollReveal
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '20px',
      duration: 500,
      delay: 100,
      reset: true, // Animation réapparaît à chaque défilement
    });

    // Appliquer l'animation aux éléments avec la classe "reveal"
    sr.reveal('.reveal');
  }, []);
    
  return (
    <>
      <div className='header reveal'>
        <h2>Hall of Fame <FaTrophy /></h2>
      </div>
    <div className="hall-of-fame reveal">
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
