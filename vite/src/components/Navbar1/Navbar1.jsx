import React from 'react';
import './Navbar1.css';

const Navbar1 = () => {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <p>HANGOUT</p>
      </div>
      <div className="nav-button">
        <button className="btn white-btn" id="loginBtn" onClick={() => window.login()}>Se connecter</button>
        <button className="btn" id="registerBtn" onClick={() => window.register()}>S'inscrire</button>
      </div>
      <div className="nav-menu-btn">
        <span className="material-symbols-outlined" onClick={() => window.myMenuFin()}>menu</span>
      </div>
    </nav>
  );
};

export default Navbar1;
