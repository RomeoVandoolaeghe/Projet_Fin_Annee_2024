import './FormOutput.css';
import React from 'react';
import Formline from "../FormLine/FormLine.jsx";
import TextArea from "../TextArea/TextArea.jsx";
import InputDate from "../InputDate/InputDate.jsx";
import InputHour from "../InputHour/InputHour.jsx";
import InputNumber from "../InputNumber/InputNumber.jsx";
import Button from "../../components/Button/Button.jsx"

function FormOutput() {
    return (
        <div className="content">
            <h2 className='h2'>Créer une sortie</h2>
            <div className='button-box'>
                <Button title="Retour" />
            </div>
            <div className='left-column'>
                <div className='element'>
                    <Formline title="Titre de la sortie" />
                    <TextArea title="Description"/>
                    <div className='input-box'>
                        <InputDate title="Date"/>
                        <InputHour title="Heure"/>
                    </div>
                    <Formline title="Lieu"/>
                    <Formline title="Rechercher un lieu" />
                    <InputNumber title="Nombre de participants" />
                    <Formline title="Invité" />
                  <div className='button'>
                    <Button title="Creer" />
                    <Button title="Annuler" />
                  </div>
                </div>
            </div>
        </div>
    );
}
 
export default FormOutput;
