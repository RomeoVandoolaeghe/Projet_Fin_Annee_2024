const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require("express-session"); // Importe le module express-session
require('dotenv').config(); // Charge les variables d'environnement à partir du fichier .env



const app = express(); // Crée une instance de l'application Express

// Middleware pour gérer les requêtes CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser()); // Middleware pour gérer les cookies
app.use(express.json()); // Middleware pour gérer les données JSON
app.use(session({ // Middleware pour gérer les sessions
    name: process.env.SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 3600000,
        sameSite: 'strict', // Ensure this is set to 'strict' for better security
        secure: false // Set to true if using https
    }
}));



const PORT = process.env.PORT || 3000; // Port sur lequel le serveur écoute

// Connexion à la base de données
const db = mysql.createConnection({ 
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hanghout'
});

// Vérifiez la connexion à la base de données
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



// Routes
// Route pour l'inscription
app.post('/inscription', async (req, res) => {
    const { pseudo, e_mail, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [resultPseudo] = await db.promise().query('SELECT Pseudo FROM utilisateur WHERE Pseudo = ?', [pseudo]);
        if (resultPseudo.length > 0) {
            return res.send("Le pseudo existe déjà");
        }
        const [resultEmail] = await db.promise().query('SELECT Mail FROM utilisateur WHERE Mail = ?', [e_mail]);
        if (resultEmail.length > 0) {
            return res.send("L'adresse mail existe déjà");
        }
        await db.promise().query('INSERT INTO utilisateur (Pseudo, Mail, Password) VALUES (?, ?, ?)', [pseudo, e_mail, hashedPassword]);
        res.send('Utilisateur enregistré avec succès');
    } catch (err) {
        console.error("Erreur lors de l'insertion dans la base de données : ", err);
        res.status(500).send('Erreur serveur');
    }
});

// Route pour la connexion
app.post('/connexion', async (req, res) => {
    const { pseudo, password } = req.body;
    try {
        const [result] = await db.promise().query('SELECT * FROM utilisateur WHERE Pseudo = ?', [pseudo]);
        if (result.length === 0) {
            return res.status(203).send('Utilisateur non trouvé');

        }
        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.status(202).send('Mot de passe incorrect');
        }



        // Définissez la session utilisateur
        req.session.user = {
            id: user.ID_utilisateur,
        };
        res.send(req.session.user);

    } catch (err) {
        console.error("Erreur serveur:", err);
        res.status(500).send('Erreur serveur');
    }
});




// Route pour la déconnexion
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erreur lors de la déconnexion:', err);
        }
        res.send('Déconnexion réussie');
    });
});




// Middleware pour vérifier si l'utilisateur est authentifié
function isAuthenticated(req, res, next) {
    // if (req.session.user) {
    //     return res.send('Authentifié');
    // }
    // res.status(201).send('Non authentifié');
    res.send(req.session.user);
}




// Route pour les disponibilités
app.post('/disponibilites', isAuthenticated, async (req, res) => {
    const { datetimedebut, datetimefin } = req.body;
    try {
        const ID_user = req.session.user.id;
        await db.promise().query('INSERT INTO disponibilite (`ID_Utilisateur`, `Date_Dispo_debut`, `Date_Dispo_fin`) VALUES (?, ?, ?);', [ID_user, datetimedebut, datetimefin], (err, result) => {
            if (err) {
                console.error("Erreur lors de l'insertion dans la base de données : ", err);
            }
        });
        res.send('Disponibilité enregistrée avec succès');
    } catch (err) {
        console.error("Erreur lors de l'insertion dans la base de données : ", err);
        res.status(500).send('Erreur serveur');
    }
});


// Route pour récupérer les disponibilités
app.get('/disponibilites', isAuthenticated, async (req, res) => {
    try {
        const ID_user = req.session.user.id;
        const [rows] = await db.promise().query('SELECT * FROM disponibilite WHERE ID_Utilisateur = ?', [ID_user]);
        res.send(rows);
    } catch (err) {
        console.error("Erreur lors de la récupération des disponibilités : ", err);
        res.status(500).send('Erreur serveur');
    }
});



app.post('/acces', isAuthenticated, async (req, res) => {
    res.send('Accès autorisé');
});

// Route pour supprimer une disponibilité
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});


