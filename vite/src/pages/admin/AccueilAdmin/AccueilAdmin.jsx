import React from 'react';
import './AccueilAdmin.css';
import GlobalStats from '../../../components/GlobalStats/GlobalStats';

function AccueilAdmin () {
    
  return ( 
    <>
      <div className='header'>
        <h3> Admin </h3>
      </div>
      <div className="home">
        <GlobalStats />
      </div>
    </>
  );
}

export default AccueilAdmin;

