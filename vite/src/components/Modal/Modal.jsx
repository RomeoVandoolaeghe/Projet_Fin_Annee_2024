// Modal.jsx
import React from 'react';
import './Modal.css'; // Assurez-vous de créer un fichier CSS pour le style du modal

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default Modal;