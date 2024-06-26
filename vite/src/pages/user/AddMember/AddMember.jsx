import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddMember.css';
import Navbar from '../../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

function AddMember() {
    const [memberName, setMemberName] = useState('');
    const [memberID, setMemberID] = useState(null);
    const [friends, setFriends] = useState([]);
    const [groupMembers, setGroupMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState('');
    const groupID = localStorage.getItem('idgroupe');
    const groupName = localStorage.getItem('nomgroupe');
    const navigate = useNavigate();


    useEffect(() => {
        if (memberName) {
            // Récupérer l'ID utilisateur basé sur le pseudo sélectionné
            axios.get('http://localhost:3000/get_user_id', { params: { pseudo: memberName } })
                .then(response => {
                    setMemberID(response.data.id);
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération de l\'ID utilisateur :', error);
                });
        }
    }, [memberName]);



    useEffect(() => {
        // Récupérer la liste des amis de l'utilisateur
        axios.get('http://localhost:3000/amis2', { withCredentials: true })
            .then(response => {
                setFriends(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des amis :', error);
            });
    }, []);

    useEffect(() => {
        // Récupérer les membres du groupe

        axios.get('http://localhost:3000/group_members', {
            params: { groupId: groupID},
            withCredentials: true
        })
        .then(response => {
            setGroupMembers(response.data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des membres du groupe :', error);
        });
    }, [groupID]);

    

    const handleAddMember = (e) => {
        e.preventDefault();

        if (!memberName) {
            alert('Veuillez sélectionner un membre à ajouter.');
            return;
        }

        console.log('Group ID:', groupID); // Affiche l'ID du groupe dans la console
        console.log('Group Name:', groupName);
        console.log('Member ID:', memberID); // Affiche l'ID du membre sélectionné dans la console

        axios.post('http://localhost:3000/add_membergroupe', { ID_Groupe: groupID, ID_Utilisateur: memberID }, { withCredentials: true })
            .then(response => {
                console.log('Membre ajouté :', response.data);
                setMemberName('');
                alert(response.data.message); // Afficher un message de confirmation
                setTimeout(() => navigate('/Chat'), 1); // Rediriger vers la page de chat après l'ajout avec un délai
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    alert(error.response.data.message); // Afficher un message d'erreur
                } else {
                    console.error('Erreur lors de l\'ajout du membre :', error);
                }
            });
    };

    const handleDeleteMember = (e) => {
        e.preventDefault();

        if (!selectedMember) {
            alert('Veuillez sélectionner un membre à supprimer.');
            return;
        }

        const [ID_Utilisateur, ID_Groupe] = selectedMember.split(':');

        axios.post('http://localhost:3000/delete_group_member', { ID_Utilisateur, ID_Groupe }, { withCredentials: true })
            .then(response => {
                alert(response.data.message); // Afficher un message de confirmation
                setSelectedMember('');
                setGroupMembers(groupMembers.filter(member => member.ID_Utilisateur !== parseInt(ID_Utilisateur)));
                setTimeout(() => navigate('/Chat'), 1); // Rediriger vers la page de chat après l'ajout avec un délai
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    alert(error.response.data.message); // Afficher un message d'erreur
                } else {
                    console.error('Erreur lors de la suppression du membre :', error);
                }
            });
    };

    return (
        <>
            <Navbar />
            <div>
                <div className='header'>
                    <h3>Ajouter un ami dans le groupe !</h3>
                </div>
                <form onSubmit={handleAddMember}>
                    <label>
                       Insérer son pseudo:
                        <select
                            value={memberName}
                            onChange={(e) => setMemberName(e.target.value)}
                        >
                            <option value="">Sélectionnez un membre</option>
                            {friends.map(friend => (
                                <option key={friend.amiID} value={friend.amiPseudo}>
                                    {friend.amiPseudo}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <button type="submit">Ajouter</button>
                </form>

                <div className='header'>
                    <h3>Supprimer un membre</h3>
                </div>
                <form onSubmit={handleDeleteMember}>
                    <label>
                        Insérer son nom:
                        <select
                            value={selectedMember}
                            onChange={(e) => setSelectedMember(e.target.value)}
                        >
                            <option value="">Sélectionnez un membre</option>
                            {groupMembers.map(member => (
                                <option key={member.ID_Utilisateur} value={`${member.ID_Utilisateur}:${member.ID_Groupe}`}>
                                    {member.Pseudo}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <button type="submit">Supprimer</button>
                </form>
            </div>
        </>
    );
}

export default AddMember;
