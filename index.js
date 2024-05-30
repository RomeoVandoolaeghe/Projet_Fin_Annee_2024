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


//api pour l'inscription
app.post('/inscription', async (req, res) => {
    const { pseudo, e_mail, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérer l'utilisateur dans la base de données
    const sql = 'INSERT INTO utilisateur (Pseudo, Mail, Password) VALUES (?, ?, ?)';

    
    db.query(sql, [pseudo, e_mail, hashedPassword], (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion dans la base de données : ", err);
            return res.status(500).send('Erreur serveur');
        }
        res.send('Utilisateur enregistré avec succès');
        console.log("test");
       
    });
});



//api pour la connexion
app.post('/connexion', async (req, res) => {
    const { pseudo, password } = req.body;


    // Insérer l'utilisateur dans la base de données
    //const sql = 'INSERT INTO utilisateur2 (Pseudo, Mail, Password) VALUES (?, ?, ?)';
    const sql = 'SELECT * FROM utilisateur WHERE Pseudo = ?';
    

    db.query(sql, [pseudo], (err, result) => {
        if (err) {
            console.error("Erreur serveur:", err);
            return res.status(500).send('Erreur serveur');
        }
        // Vérifier si l'utilisateur existe
        if (result.length === 0) {
            // Utilisateur non trouvé
            return res.send('Utilisateur non trouvé');
        }
        

        // Vérifier le mot de passe
        const user = result[0];
        bcrypt.compare(password, user.Password, (err, isMatch) => {
            if (err) {
                console.error("Erreur serveur:", err);
                return res.status(500).send('Erreur serveur');
            }
            if (!isMatch) {
                return res.send('Mot de passe incorrect');
            }
            res.send('Connexion réussie');
        });






    });



});


app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

