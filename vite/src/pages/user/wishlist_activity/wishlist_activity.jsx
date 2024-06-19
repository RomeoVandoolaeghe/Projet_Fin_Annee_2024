import React, { useState } from 'react';
import './wishlist_activity.css';

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
            <h1>Wishlist Activity</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="placeInput">Add Place to Wishlist:</label>
                <input
                    type="text"
                    id="placeInput"
                    value={place}
                    onChange={handlePlaceChange}
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default WishlistActivity;