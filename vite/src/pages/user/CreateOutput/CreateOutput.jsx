import React, { useEffect, useState } from 'react';
import ScrollReveal from 'scrollreveal';
import './CreateOutput.css';
import Formline from "../../../components/FormLine/FormLine.jsx";
import InputHour from "../../../components/InputHour/InputHour.jsx";
import InputNumber from "../../../components/InputNumber/InputNumber.jsx";
import InputDate from '../../../components/InputDate/InputDate.jsx';
import Button from '../../../components/Button/Button.jsx';
import TextArea from '../../../components/TextArea/TextArea.jsx';
import axios from 'axios';

function CreateOutput() {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    duree: '',
    description: '',
    lieu: '',
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
  console.log('ID DU GROUPE :', groupID);

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
      })
      .catch((error) => {
        console.error("Erreur lors de la création de la sortie ", error);
      });
  };

  return (
    <>
      <div className="container">
        <div className='start reveal'>
          <h1>Creer une sortie</h1>
          <div className='space'>
            <input type='text' placeholder='Titre de la sortie' title="Titre de la sortie" name="title" value={formData.title} onChange={handleChange} />
          </div>
          <div>
            <input placeholder="Description de la sortie" title="Description" name="description" value={formData.description} onChange={handleChange} />
          </div>
          <div>
            <input type="text" placeholder='Lieu' name="lieu"  value={formData.lieu} onChange={handleChange}  />
          </div>
          <div className='space'>
            <input type='text' placeholder="Durée (en minutes)" name="duree" value={formData.duree} onChange={handleChange} />
          </div>
          <div className='linediv reveal'>
            <input type='datetime-local' title="Date" name="date" value={formData.date} onChange={handleChange} />
          </div>
          <div className='linebutton reveal'>
            <button title="Annuler">Retour</button>
            <button title="Creer" onClick={handleCreate}>Créer</button>

          </div>
        </div>
      </div>
    </>
  );
}

export default CreateOutput;
