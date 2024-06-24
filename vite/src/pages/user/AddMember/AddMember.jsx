import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddMember.css';
import Navbar from '../../../components/Navbar/Navbar';

function AddMember() {
    const [memberName, setMemberName] = useState('');
    const [friends, setFriends] = useState([]);
    const groupID = localStorage.getItem('idgroupe');

    useEffect(() => {
        // Récupérer la liste des amis de l'utilisateur
        axios.get('http://localhost:3000/amis', { withCredentials: true })
            .then(response => {
                setFriends(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des amis :', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique pour ajouter le membre au chat
        axios.post('http://localhost:3000/add_member', { username: memberName, ID_Groupe: groupID }, { withCredentials: true })
            .then(response => {
                console.log('Membre ajouté :', response.data);
                setMemberName('');
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout du membre :', error);
            });
    };

    return (
        <>
            <Navbar />
            <div>
                <div className='header'>
                    <h3>Ajouter un membre au chat</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nom du membre:
                        <select
                            value={memberName}
                            onChange={(e) => setMemberName(e.target.value)}
                        >
                            <option value="">Sélectionnez un membre</option>
                            {friends.map(friend => (
                                <option key={friend.ID_Utilisateur} value={friend.Pseudo}>
                                    {friend.Pseudo}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <button type="submit">Ajouter</button>
                </form>
            </div>
        </>
    );
}

export default AddMember;
