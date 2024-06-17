import React, { useState } from 'react';
import './CreateGroup.css';

function CreateGroup({ onCreateGroup }) {
  const [groupName, setGroupName] = useState('');
  const [users, setUsers] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreateGroup(groupName, users);
    setGroupName('');
    setUsers('');
  };
  const addGroup = (groupName, users) => {
    const newGroup = {
      id: groups.length + 1,
      name: groupName,
      users: users.split(',').map(user => user.trim()), // Convertir les utilisateurs en tableau
      image: groupName.charAt(0).toUpperCase() // Juste une logique pour l'image, vous pouvez la changer
    };
    setGroups([...groups, newGroup]);
  };

  return (
    <div className="create-group-form-container">
      <header>
        <h5>Créer un groupe</h5>
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
          <button type="submit" onCreateGroup={addGroup}>Créer</button>
        </div>
      </form>
    </div>
  );
}

export default CreateGroup;
