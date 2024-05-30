import { useState } from 'react'
import axios from 'axios';

function Inscription() {

  const [formData, setFormData] = useState({
    pseudo: '',
    e_mail: '',
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
      e_mail: '',
      password: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    // L'URL de l'API à laquelle vous envoyez la requête POST
    const url = 'http://localhost:3000/inscription';

    axios.post(url, formData)
      .then(response => {
        console.log('Réponse du serveur:', response.data);
        //document.cookie = "Pseudo_Cookie=; path=/; max-age=0";
      })
      .catch(error => {
        console.error('Erreur lors de la requête POST:', error);
      });

    resetForm(); // Clear le formulaire
  };


  return (
    <div className="App">
      <h1>Formulaire d'Inscription</h1>
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
          <label htmlFor="e_mail">Email: </label>
          <input
            type="text"
            id="e_mail"
            name="e_mail"
            value={formData.e_mail}
            onChange={handleChange}
            pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}" 
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
            pattern="(?=.*\d)(?=.*[A-Z])(?=.*[@$!%*?&]).*"
            required
          />
        </div>
        <br></br>

        <button type="submit">Envoyer </button>
      </form>
    </div>
  );
}

export default Inscription
