const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require("express-session");
require('dotenv').config();



const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(session({
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



const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hanghout'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connecté à la base de données');
});



function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Erreur serveur');
}
app.use(errorHandler);

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

app.post('/connexion', async (req, res) => {
    const { pseudo, password } = req.body;
    try {
        const [result] = await db.promise().query('SELECT * FROM utilisateur WHERE Pseudo = ?', [pseudo]);
        if (result.length === 0) {
            return res.send('Utilisateur non trouvé');
        }
        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.send('Mot de passe incorrect');
        }

        // Vérifiez les données utilisateur obtenues de la base de données
        console.log('User:', user);

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




app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erreur lors de la déconnexion:', err);
        }
        res.send('Déconnexion réussie');
    });
});





function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.status(401).send('Vous devez être connecté pour accéder à cette ressource');
}

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

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
