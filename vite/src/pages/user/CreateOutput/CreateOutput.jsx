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


  axios.post("http://localhost:3000/acces", "", { withCredentials: true })
    .then(response => {
      console.log('Réponse de la requête POST:', response);
      if (response.status === 201) {
        window.location.href = 'http://localhost:5173';
        alert('Veuillez vous connecter pour accéder à cette page')
      }


    })
    .catch(error => {
      console.error('Erreur lors de la requête POST:', error);
    });


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
        console.log(response.status);
        console.log(response.data);
        if (response.status === 201) {
          return alert('La sortie doit être dans le futur!');
        }
        else {
          console.log('Sortie créée :', response.data);
          setNotification({ type: 'success', message: 'Sortie créée avec succès!', visible: true });
          // Masquer la notification après 5 secondes
          setTimeout(() => {
            setNotification({ ...notification, visible: false });
          }, 5000);
          handleAdd_Member_Sortie();
        }

      })
      .catch((error) => {
        console.error("Erreur lors de la création de la sortie ", error);
        setNotification({ type: 'error', message: 'Erreur lors de la création de la sortie', visible: true });
        // Masquer la notification après 5 secondes
        setTimeout(() => {
          setNotification({ ...notification, visible: false });
        }, 5000);
      });


  };

  const handleAdd_Member_Sortie = () => {
    axios.post('http://localhost:3000/add_member_sortie_creator', { nom_sortie: formData.title }, { withCredentials: true })
      .then((response) => {
        console.log('Réponse du serveur:', response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la requête POST:', error);
      });
  };

  const navigate = useNavigate(); // Utilisation du hook useNavigate
  const handleCancel = () => {
    navigate('/group'); // Remplacez '/group' par la route vers laquelle vous voulez rediriger
  };

  const getMinDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <>
      <Navbar />
      {notification.visible && (
        <div className={`notification reveal ${notification.type}-msg`}>
          <i className={`fa fa-${notification.type === 'success' ? 'check' : 'times-circle'}`}></i>
          {notification.message}
        </div>
      )}
      <div className="container">
        <div className='start reveal'>
          <h3>Creer une sortie</h3>
          <div className='space'>
            <input type='text' placeholder='Titre de la sortie' title="Titre de la sortie" name="title" value={formData.title} onChange={handleChange} className='input1' />
          </div>
          <div className='space one'>
            <input type='text'
              placeholder="Description de la sortie"
              title="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className='input1'
              rows="20"
              cols="42"
            />
          </div>
          <div className='space'>
            <input type="text" placeholder='Lieu' name="lieu" value={formData.lieu} onChange={handleChange} className='input1' />
          </div>
          <div className='space'>
            <input type='text' placeholder="Durée (en minutes)" name="duree" value={formData.duree} onChange={handleChange} className='input1' />
          </div>
          <div className='linediv reveal'>
            <input type='datetime-local' title="Date" name="date" value={formData.date} onChange={handleChange} min={getMinDateTime()} className='input1' />
          </div>
          <div className='linebutton reveal'>
            <button title="Annuler" onClick={handleCancel}>Retour</button>
            <button title="Creer" onClick={handleCreate}>Créer</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateOutput;
