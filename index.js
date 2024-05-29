const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();


// Utilisation du middleware CORS pour autoriser toutes les origines
app.use(cors({}));
app.use(cookieParser());
app.use(express.json()); // Pour analyser les requêtes JSON


const PORT = process.env.PORT || 3000;


// Configuration de la connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hanghout'
});

// Connexion à la base de données
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connecté à la base de données');
});



app.post('/inscription', async (req, res) => {
    const { pseudo, e_mail, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérer l'utilisateur dans la base de données
    const sql = 'INSERT INTO utilisateur2 (Pseudo, Mail, Password) VALUES (?, ?, ?)';

    
    db.query(sql, [pseudo, e_mail, hashedPassword], (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion dans la base de données : ", err);
            return res.status(500).send('Erreur serveur');
        }
        res.send('Utilisateur enregistré avec succès');
        console.log("test");
       
    });
});


app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
