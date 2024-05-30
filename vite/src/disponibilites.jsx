import { useState, useEffect } from 'react';
import axios from 'axios';

function Disponibilites() {
    const [formData, setFormData] = useState({
        datetimedebut: '',
        datetimefin: ''
    });

    const [disponibilites, setDisponibilites] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const resetForm = () => {
        setFormData({
            datetimedebut: '',
            datetimefin: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('DateTime submitted: ', formData);
        
        const url = 'http://localhost:3000/disponibilites';

        axios.post(url, formData)
            .then(response => {
                console.log('Réponse du serveur:', "Disponibilites enregistrées avec succès");
                fetchDisponibilites(); // Mettre à jour la liste des disponibilités après l'ajout
            })
            .catch(error => {
                console.error('Erreur lors de la requête POST:', error);
            });

        resetForm(); // Clear le formulaire
    };


    // Fonction pour récupérer les disponibilités
    const fetchDisponibilites = () => {
        axios.get('http://localhost:3000/disponibilites')
            .then(response => {
                setDisponibilites(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des disponibilités :', error);
            });
    };

    // Utiliser useEffect pour récupérer les disponibilités au montage du composant
    useEffect(() => {
        fetchDisponibilites();
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="datetime-local"
                        name="datetimedebut"
                        value={formData.datetimedebut}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="datetime-local"
                        name="datetimefin"
                        value={formData.datetimefin}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Ajouter ma disponibilite</button>
            </form>

            <h2>Liste des disponibilités</h2>
            <ul>
                {disponibilites.map((dispo, index) => (
                    <li key={index}>
                        Début: {dispo.Date_Dispo_debut}, Fin: {dispo.Date_Dispo_fin}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Disponibilites;
