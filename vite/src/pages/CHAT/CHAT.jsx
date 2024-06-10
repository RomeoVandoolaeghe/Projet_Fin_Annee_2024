import React from 'react';
import ScrollReveal from 'scrollreveal';
import './CHAT.css';

function Chat() {

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
    <div className="chat-container reveal">
      <div className="sidebar">
        <div className="search">
          <input type="text" placeholder="Rechercher un membre" />
        </div>
        <div className="group-members">
          <h3>Discussion</h3>
          <ul>
            {Array.from({ length: 10 }).map((_, index) => (
              <li key={index}>
                <div className="member-avatar"></div>
                <div className="member-info">
                  <span>Docteur Strange</span>
                  <span className="status">Actif</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="chat-area">
        <div className="chat-header">JUNIA XP</div>
        <div className="messages">
          <div className="message">Comment allez-vous ?</div>
          <div className="message">...</div>
          <div className="message">...</div>
        </div>
        <div className="chat-input">
          <input type="text" placeholder="Entrez votre message ..." />
          <button className="send-button">Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
