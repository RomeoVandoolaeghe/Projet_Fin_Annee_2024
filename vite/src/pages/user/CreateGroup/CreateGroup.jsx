import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateGroup.css';

function CreateGroup({ onCreateGroup }) {
  const [groupName, setGroupName] = useState('');
  const [users, setUsers] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreateGroup(groupName, users);
    setGroupName('');
    setUsers('');
    navigate('/Group'); // Rediriger vers la page des groupes après la création
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
          <button type="button" onClick={() => navigate(-1)}>
            Retour
          </button>
          <button type="submit">Créer</button>
        </div>
      </form>
    </div>
  );
}

export default CreateGroup;
