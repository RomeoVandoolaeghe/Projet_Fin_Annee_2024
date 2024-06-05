import { useState, useEffect } from 'react';
import axios from 'axios';


// Composant pour gérer les disponibilités
function Disponibilites() {

    // Utiliser le hook useState pour initialiser les disponibilités
    const [formData, setFormData] = useState({
        cookie_pseudo: '',
        datetimedebut: '',
        datetimefin: ''
    });



    const [disponibilites, setDisponibilites] = useState([]);

    // Utiliser useEffect pour récupérer les disponibilités au montage du composant
    useEffect(() => {
        const fetchDisponibilites = async () => {

            try {
                const response = await axios.get('http://localhost:3000/disponibilites');
                if (response.data && Array.isArray(response.data)) {
                    setDisponibilites(response.data);
                } else {
                    console.error('Les données reçues ne sont pas valides', response.data);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des disponibilités:', error);
            }
        };
        fetchDisponibilites();
    }, []);


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
            cookie_pseudo: '',
            datetimedebut: '',
            datetimefin: ''
        });
    };

    const cookie_pseudo = document.cookie.split('=')[1];
    cookie_pseudo ? formData.cookie_pseudo = cookie_pseudo : formData.cookie_pseudo = '';




    // Fonction pour soumettre le formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('formulaire: ', formData); // Afficher les données du formulaire

        const url = 'http://localhost:3000/disponibilites'; // L'URL de l'API à laquelle vous envoyez la requête POST

        // Envoi de la requête POST à l'API
        axios.post(url, formData)
            .then(response => {
                console.log('Réponse du serveur:', "Disponibilité enregistrée avec succès");
                setDisponibilites([...disponibilites, formData]); // Mettre à jour la liste des disponibilités
            })
            .catch(error => {
                console.error('Erreur lors de la requête POST:', error);
            });

        resetForm(); // Clear le formulaire
    };









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
                        Début: {new Date(dispo.Date_Dispo_debut).toLocaleString()} - Fin: {new Date(dispo.Date_Dispo_fin).toLocaleString()}
                    </li>
                ))}
            </ul>


        </div>
    );
}

export default Disponibilites;
