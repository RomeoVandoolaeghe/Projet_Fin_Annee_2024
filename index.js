const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
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

// Middleware pour gérer les erreurs
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Erreur serveur');
}
app.use(errorHandler);

// API pour l'inscription
app.post('/inscription', async (req, res) => {
    const { pseudo, e_mail, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Vérification de l'existence du pseudo
        const [resultPseudo] = await db.promise().query('SELECT Pseudo FROM utilisateur WHERE Pseudo = ?', [pseudo]);
        if (resultPseudo.length > 0) {
            return res.send("Le pseudo existe déjà");
        }

        // Vérification de l'existence de l'email
        const [resultEmail] = await db.promise().query('SELECT Mail FROM utilisateur WHERE Mail = ?', [e_mail]);
        if (resultEmail.length > 0) {
            return res.send("L'adresse mail existe déjà");
        }

        // Insérer l'utilisateur dans la base de données
        await db.promise().query('INSERT INTO utilisateur (Pseudo, Mail, Password) VALUES (?, ?, ?)', [pseudo, e_mail, hashedPassword]);
        res.send('Utilisateur enregistré avec succès');
    } catch (err) {
        console.error("Erreur lors de l'insertion dans la base de données : ", err);
        res.status(500).send('Erreur serveur');
    }
});

// API pour la connexion
app.post('/connexion', async (req, res) => {
    const { pseudo, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe
        const [result] = await db.promise().query('SELECT * FROM utilisateur WHERE Pseudo = ?', [pseudo]);
        if (result.length === 0) {
            return res.send('Utilisateur non trouvé');
        }

        // Vérifier le mot de passe
        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.send('Mot de passe incorrect');
        }

        res.send('Connexion réussie');
    } catch (err) {
        console.error("Erreur serveur:", err);
        res.status(500).send('Erreur serveur');
    }
});

app.get('/connexion', async (req, res) => {

});

// API pour ajouter une disponibilité
app.post('/disponibilites', async (req, res) => {
    const {datetimedebut,datetimefin} = req.body;
    db.query('INSERT INTO disponibilite (`ID_Utilisateur`, `Date_Dispo_debut`, `Date_Dispo_fin`) VALUES (?, ?, ?);', ['5',datetimedebut,datetimefin], (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion dans la base de données : ", err);
        }
    });


});

app.get('/disponibilites', async (req, res) => {
    try {
        const [result] = await db.promise().query('SELECT * FROM disponibilite');
        res.json(result);
    } catch (err) {
        console.error("Erreur lors de la récupération des disponibilités : ", err);
        res.status(500).send('Erreur serveur');
    }
});





app.post('/logout', (req, res) => {
    res.clearCookie('Pseudo_Cookie'); 
    res.send('Le cookie a été supprimé');
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
