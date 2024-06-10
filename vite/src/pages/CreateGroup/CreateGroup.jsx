import React from 'react';
import './CreateGroup.css'; 

function CreateGroup() {
  return (
    <div className="container">
      <div className="form-container">
        <h2>Créer un groupe</h2>
        <form>
          <div className="form-group">
            <label htmlFor="group-name">Nom du groupe :</label>
            <input type="text" id="group-name" name="group-name" required />
          </div>
          <div className="form-group">
            <label htmlFor="add-users">Ajouter des utilisateurs :</label>
            <input type="text" id="add-users" name="add-users" required />
          </div>
          <div className="form-group buttons">
            <button type="button" onClick={() => window.history.back()}>
              Retour
            </button>
            <button type="submit">Créer</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateGroup;