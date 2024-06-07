import { useState } from 'react'
import axios from 'axios';
axios.defaults.withCredentials = true;


function Deconnexion(){

    const handleLogout = () => {
        axios.post('http://localhost:3000/logout', { withCredentials: true })
        .then(response => {
            console.log('Réponse du serveur:', response.data);
        })
        .catch(error => {
            console.error('Erreur lors de la requête POST:', error);
        });
    }
    return (
        <button onClick={handleLogout}>Déconnexion</button>
    );

}
export default Deconnexion