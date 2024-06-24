import React, { useEffect, useState } from 'react';
import ScrollReveal from 'scrollreveal';
import './CreateOutput.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';

function CreateOutput() {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    duree: '',
    description: '',
    lieu: '',
  });

  const [notification, setNotification] = useState({ type: '', message: '', visible: false });

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

  const groupID = localStorage.getItem('idgroupe');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    axios.post('http://localhost:3000/creer_sortie', { ...formData, ID_Groupe: groupID }, { withCredentials: true })
      .then((response) => {
        console.log('Sortie créée :', response.data);
        setNotification({ type: 'success', message: 'Sortie créée avec succès!', visible: true });
      })
      .catch((error) => {
        console.error("Erreur lors de la création de la sortie ", error);
        setNotification({ type: 'error', message: 'Erreur lors de la création de la sortie', visible: true });
      });

    // Masquer la notification après 5 secondes
    setTimeout(() => {
      setNotification({ ...notification, visible: false });
    }, 5000);
  };

  const navigate = useNavigate(); // Utilisation du hook useNavigate
  const handleCancel = () => {
    navigate('/group'); // Remplacez '/group' par la route vers laquelle vous voulez rediriger
  };

  return (
    <>
      <Navbar />

      <div className="container">
        {notification.visible && (
          <div className={`notification ${notification.type}-msg`}>
            <i className={`fa fa-${notification.type === 'success' ? 'check' : 'times-circle'}`}></i>
            {notification.message}
          </div>
        )}
        <div className='start reveal'>
          <h1>Creer une sortie</h1>
          <div className='space'>
            <input type='text' placeholder='Titre de la sortie' title="Titre de la sortie" name="title" value={formData.title} onChange={handleChange} />
          </div>
          <div>
            <input placeholder="Description de la sortie" title="Description" name="description" value={formData.description} onChange={handleChange} />
          </div>
          <div>
            <input type="text" placeholder='Lieu' name="lieu" value={formData.lieu} onChange={handleChange} />
          </div>
          <div className='space'>
            <input type='text' placeholder="Durée (en minutes)" name="duree" value={formData.duree} onChange={handleChange} />
          </div>
          <div className='linediv reveal'>
            <input type='datetime-local' title="Date" name="date" value={formData.date} onChange={handleChange} />
          </div>
          <div className='linebutton reveal'>
            <button title="Annuler" onClick={handleCancel} >Retour</button>
            <button title="Creer" onClick={handleCreate}>Créer</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateOutput;
