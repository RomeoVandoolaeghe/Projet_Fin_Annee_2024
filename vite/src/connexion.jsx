import { useState } from 'react'
import axios from 'axios';

function Connexion() {

  const [formData, setFormData] = useState({
    pseudo: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const resetForm = () => {
    setFormData({
      pseudo: '',
      password: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    resetForm(); // Clear le formulaire
  };


  return (
    <div className="App">
      <h1>Formulaire de Connexion</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pseudo">Pseudo: </label>
          <input
            type="text"
            id="pseudo"
            name="pseudo"
            value={formData.pseudo}
            onChange={handleChange}
          />
        </div>
        <br></br>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password" 
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange} 
            required
          />
        </div>
        <br></br>
        <button type="submit">Envoyer </button>
      </form>
    </div>
  );
}

export default Connexion
