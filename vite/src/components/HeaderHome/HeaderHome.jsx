import React from 'react';
import './HeaderHome.css';

function HeaderHome({ name }) {
  return (
    <header className="header-home">
      <h2>Hello {name} !!!</h2>
    </header>
  );
}

export default HeaderHome;
