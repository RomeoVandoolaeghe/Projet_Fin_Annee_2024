import React, { useState } from 'react';
import axios from 'axios';
import './WishlistActivity.css';
import WishlistOutings from '../../../components/WishlistOutings/WishlistOutings';

const WishlistActivity = () => {
    const [place, setPlace] = useState('');

    const handlePlaceChange = (e) => {
        setPlace(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Ajout à la wishlist reussie :', place);
        if(place != ''){

            axios.post('http://localhost:3000/edit_wishlist', { place: place }, { withCredentials: true })
            .then(response => {
              alert('La Whislist a été modifié', response.data);
            })
            .catch(error => {
              console.error('Erreur lors de l\'insertion de la description', error);
            });
              
            }
    };

    return (
        <div>
            <div className='header'>
                <h3>Ajouter une activité </h3>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="placeInput"
                    value={place}
                    onChange={handlePlaceChange}
                />
                <button type="submit">Ajouter</button>
            </form>
            <WishlistOutings />
        </div>
    );
};

export default WishlistActivity;