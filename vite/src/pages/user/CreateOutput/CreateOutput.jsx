import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import './CreateOutput.css'
import Formline from "../../../components/FormLine/FormLine.jsx";
import InputHour from "../../../components/InputHour/InputHour.jsx";
import InputNumber from "../../../components/InputNumber/InputNumber.jsx";
import InputDate from '../../../components/InputDate/InputDate.jsx'; // Assurez-vous que le chemin est correct
import Button from '../../../components/Button/Button.jsx';
import TextArea from '../../../components/TextArea/TextArea.jsx';

function CreateOutput(){
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

  return (
    <>
      <div className="container">
        <div className='button-box'>
          <Button title="Retour" to="/Events" />
        </div>
        <div className='start reveal'>
          <h1>Creer une sortie</h1>
          <div className='space'>
            <Formline title="Titre de la sortie" />
          </div>
          <div>
            <TextArea title="Description"/>
          </div>
          <div className='space'>
            <InputNumber title="Nombre de participant" />
          </div>
          <div className='linediv reveal'>
            <InputDate title="Date" />
            <InputHour title="Heure" />
          </div>
          <div className='linebutton reveal'>
            <Button title="Creer" />
            <Button title="Annuler"/>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateOutput;
