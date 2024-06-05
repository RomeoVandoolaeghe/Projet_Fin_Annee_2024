const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001; // Utilisez un autre port

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', // Remplacez par votre mot de passe MySQL
    database: 'hanghout' // Remplacez par le nom de votre base de données
});

db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});

app.get('/api/data', (req, res) => {
    const query = 'SELECT * FROM votre_table'; // Remplacez par votre requête SQL
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`Serveur backend démarré sur le port ${port}`);
});
