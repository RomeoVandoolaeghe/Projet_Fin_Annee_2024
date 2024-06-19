import React, { useState } from 'react';
import './WishlistActivity.css';

const WishlistActivity = () => {
    const [place, setPlace] = useState('');

    const handlePlaceChange = (e) => {
        setPlace(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Ajout à la wishlist reussie :', place);
        setPlace('');
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
        </div>
    );
};

export default WishlistActivity;