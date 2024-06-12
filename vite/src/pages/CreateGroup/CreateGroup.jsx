import React, { useState } from 'react';
import './CreateGroup.css'; 


function CreateGroup() {
    const [groupName, setGroupName] = useState('');
    const [users, setUsers] = useState('');

    const handleSubmit = (event) => {
    event.preventDefault();
    // Logique pour créer un groupe
    console.log(`Groupe créé : ${groupName}, Utilisateurs : ${users}`);
    // Réinitialise les champs après soumission
    setGroupName('');
    setUsers('');
  };
  return (
    <div className="create-group-form-container">
      <header>
        <h3>Créer un groupe</h3>
      </header> 
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="group-name">Nom du groupe :</label>
          <input 
            type="text" 
            id="group-name" 
            name="group-name" 
            value={groupName} 
            onChange={(e) => setGroupName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="users">Ajouter des utilisateurs :</label>
          <input 
            type="text" 
            id="users" 
            name="users" 
            value={users} 
            onChange={(e) => setUsers(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group buttons">
          <button type="button" onClick={() => window.history.back()}>
            Retour
          </button>
          <button type="submit">Créer</button>
        </div>
      </form>
    </div>
  );
}

export default CreateGroup;