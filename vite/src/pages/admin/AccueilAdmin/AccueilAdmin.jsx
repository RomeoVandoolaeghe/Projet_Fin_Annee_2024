import React from 'react';
import './AccueilAdmin.css';
import GlobalStats from '../../../components/GlobalStats/GlobalStats';
import Sidebar from '../../../components/Sidebar/Sidebar';

function AccueilAdmin () {
  
  return ( 
  <>
    <div className='header'>
      <h3> Admin </h3>
    </div>
    <div className="Admin">
      <div className="contenu-principal">
        <div className="colonne">
          <Sidebar />
        </div>
        <div className="colonne">
          <div className="home">
            <GlobalStats />
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default AccueilAdmin;
