import { useState, useEffect } from 'react';
import axios from 'axios';

function Disponibilites() {
    const [disponibilites, setDisponibilites] = useState([]);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        cookie_pseudo: '',
        datetimedebut: '',
        datetimefin: ''
    });

    
    useEffect(() => {
        const fetchDisponibilites = async () => {
            try {
                const response = await axios.get('http://localhost:3000/disponibilites', { withCredentials: true });
                if (response.data && Array.isArray(response.data)) {
                    setDisponibilites(response.data);
                } else {
                    console.error('Les données reçues ne sont pas valides', response.data);
                }
            } catch (error) {
                setError(error);
            }
        };

        fetchDisponibilites();
    }, []);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const resetForm = () => {
        setFormData({
            cookie_pseudo: '',
            datetimedebut: '',
            datetimefin: ''
        });
    };



    useEffect(() => {
        const pseudoFromCookie = document.cookie.split('=')[1] || '';
        setFormData({ ...formData, cookie_pseudo: pseudoFromCookie });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulaire soumis :', formData);

        const url = 'http://localhost:3000/disponibilites';

        axios.post(url, formData)
            .then(response => {
                console.log('Réponse du serveur:', response.data);
                // setDisponibilites([...disponibilites, formData]);
            })
            .catch(error => {
                console.error('Erreur lors de la requête POST:', error);
            });

        resetForm();
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
                <button type="submit">Ajouter ma disponibilité</button>
            </form>
            <h2>Liste des disponibilités</h2>
            <ul>
                {disponibilites.map((disponibilite, index) => (
                    <li key={index}>
                        {disponibilite && disponibilite.ID_Utilisateur !== undefined && disponibilite.Date_Dispo_debut !== undefined && disponibilite.Date_Dispo_fin !== undefined ? (
                            <>
                                Date Début: {new Date(disponibilite.Date_Dispo_debut).toLocaleString()},
                                Date Fin: {new Date(disponibilite.Date_Dispo_fin).toLocaleString()}
                            </>
                        ) : (
                            <span>Données invalides</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}



export default Disponibilites;
