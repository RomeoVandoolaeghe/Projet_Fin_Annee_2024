import './DetailGroup.css';
import React from 'react';

function DetailGroup({ closeModal }) {
    return (
      <>
        <div onClick={closeModal} className="overlay"></div>
        <div className="modal">
          <header>
            <h3>Détail du groupe</h3>
          </header>
          <div className="admin-panel">
            <div className="profile-icon" />
                <h3> JUNIA XP </h3> 
            </div>
            <div className="user-list">
                <h4>Membres :</h4>
                <ul>
                <li>Utilisateur 1</li>
                <li>Utilisateur 2</li>
                </ul>
            </div>
            <button className="close-button" onClick={closeModal}>
                x
            </button>
        </div>
      </>
    );
}
export default DetailGroup;