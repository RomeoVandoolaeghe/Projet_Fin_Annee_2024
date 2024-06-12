import React, { useState } from 'react';
import axios from 'axios';

function Ajout_amis() {
    const [champ, setChamp] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/search_utilisateur', { champ });
            console.log(response.data[0].Pseudo);
        } catch (error) {
            console.error("Cette utilisateur n'existe pas dans la liste:", error);
        }
    };

    return (
        <div className="App">
            <h1>Cherchez votre amis</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Quel est son nom ? :
                </label>
                <br></br><br></br>
                    <input
                        type="text"
                        value={champ}
                        onChange={(e) => setChamp(e.target.value)}
                        required
                      />      
                <br></br><br></br>
                <button type="submit">Cherchez le</button>
            </form>








        </div>
    );
}

export default Ajout_amis;
