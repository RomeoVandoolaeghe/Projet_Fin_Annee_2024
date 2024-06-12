import React, { useState } from 'react';
import axios from 'axios';


const Imagedescription = () => {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', file);
        //formData.append('description', description);

        for (let [key, value] of formData.entries()) {
            console.log(`${value}`); // Affichage des entrées
        }

        try {
            const response = await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/formData',
                },
            });
            console.log('Réponse du serveur:', response.data);
        } catch (error) {
            console.error('Erreur lors de la requête POST:', error);
        }

        
    };

    return (
        <form onSubmit={handleSubmit} style={styles.container}>
            <input type="file" onChange={handleFileChange} style={styles.fileInput} required/>
            {file && (
                <div style={styles.fileDetails}>
                    <p><strong>Nom du fichier:</strong> {file.name}</p>
                    <p><strong>Taille du fichier:</strong> {(file.size / 1024).toFixed(2)} KB</p>
                </div>
            )}
            <textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Écrire une description..."
                style={styles.textarea}
                required
            />
            <button type="submit" style={styles.submitButton}>Soumettre</button>
        </form>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '10px',
        width: '300px',
        margin: '20px auto',
    },
    fileInput: {
        marginBottom: '10px',
    },
    fileDetails: {
        marginBottom: '10px',
    },
    textarea: {
        width: '100%',
        height: '100px',
        borderRadius: '5px',
        padding: '10px',
        border: '1px solid #ccc',
        resize: 'none',
    },
    submitButton: {
        marginTop: '10px',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#A20000',
        color: 'white',
        cursor: 'pointer',
    },
};

export default Imagedescription;