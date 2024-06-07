const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ho'
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});

app.get('/groupes', (req, res) => {
    const sql = 'SELECT Nom_groupe FROM Groupe';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête:', err);
            res.status(500).send('Erreur du serveur');
            return;
        }
        res.json(result);
    });
});

const port = 3001;
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
