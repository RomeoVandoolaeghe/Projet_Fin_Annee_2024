import React from 'react';
import './HeaderHome.css';

function HeaderHome({ name }) {
  return (
    <header className="entete">
      <h2>Hello {name} !!!</h2>
    </header>
  );
}

export default HeaderHome;
