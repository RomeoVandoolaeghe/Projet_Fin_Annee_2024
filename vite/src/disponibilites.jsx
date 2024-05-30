import { useState, useEffect } from 'react';
import axios from 'axios';


// Composant pour gérer les disponibilités
function Disponibilites() {

    // Utiliser le hook useState pour initialiser les disponibilités
    const [formData, setFormData] = useState({
        datetimedebut: '',
        datetimefin: ''
    });

    // Utiliser le hook useState pour initialiser les disponibilités
    const [disponibilites, setDisponibilites] = useState([]);

    // Fonction pour gérer les changements dans le formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Fonction pour réinitialiser le formulaire
    const resetForm = () => {
        setFormData({
            datetimedebut: '',
            datetimefin: ''
        });
    };

    // Fonction pour soumettre le formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('DateTime submitted: ', formData); // Afficher les données du formulaire
        
        const url = 'http://localhost:3000/disponibilites'; // L'URL de l'API à laquelle vous envoyez la requête POST

        // Envoi de la requête POST à l'API
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


    // Fonction pour récupérer les disponibilités depuis l'API
    const fetchDisponibilites = () => {
        axios.get('http://localhost:3000/disponibilites')
            .then(response => {
                setDisponibilites(response.data);
                console.log('Disponibilités récupérées avec succès:', response.data);
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
