const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require("express-session"); // Importe le module express-session
require('dotenv').config(); // Charge les variables d'environnement à partir du fichier .env
const MySQLStore = require('express-mysql-session')(session); // Importe le module express-mysql-session

// Configuration de la base de données MySQL
const options = {
    host: 'localhost',
    port: 3306, // Port par défaut de MySQL sur MAMP
    user: 'root', // Utilisateur par défaut de MAMP
    password: 'root', // Mot de passe par défaut de MAMP
    database: 'hanghout' // Remplacez par le nom de votre base de données
};

// Création du store de sessions MySQL
const sessionStore = new MySQLStore(options);


const app = express(); // Crée une instance de l'application Express


// Middleware pour gérer les requêtes CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser()); // Middleware pour gérer les cookies
app.use(express.json()); // Middleware pour gérer les données JSON
app.use(session({ // Middleware pour gérer les sessions
    store: sessionStore,
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

// Importer les routes
const amis = require('./Routes/amis');
app.use('/amis', amis);

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
    console.log('Connecté à la base de données 2');
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




app.post('/logout', (req, res) => {
    const sessionId = req.session.id;

    // Suppression de la session de la base de données
    db.query("DELETE FROM sessions", (err) => {
        if (err) {
            return res.status(500).send("Erreur lors de la suppression de la session.");
        }

        // Supprimer la session côté serveur
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send("Erreur lors de la destruction de la session.");
            }

            // Supprimer le cookie de session du navigateur
            res.clearCookie('sid', { path: '/' });
            return res.send("Déconnexion réussie.");
        });
    });
});



// Middleware pour vérifier si l'utilisateur est authentifié
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    else {
        return res.status(201).send('Non authentifié');
    }


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




app.post("/verif_ami", (req, res) => {
    const ID_utilisateur1 = req.session.user.id; // ID de l'utilisateur actuel
    console.log("ID de l'utilisateur actuel:", ID_utilisateur1);
    const { champ } = req.body; // Pseudo de l'utilisateur à rechercher
    console.log("Pseudo de l'utilisateur à rechercher:", champ);
    // Requête SQL combinée
    const checkSql = `
      SELECT * FROM amitie
      WHERE ((ID_utilisateur1 = ? AND ID_utilisateur2 = (SELECT ID_utilisateur FROM utilisateur WHERE Pseudo = ?))
         OR (ID_utilisateur1 = (SELECT ID_utilisateur FROM utilisateur WHERE Pseudo = ?) AND ID_utilisateur2 = ?))
    `;

    db.query(checkSql, [ID_utilisateur1, champ, champ, ID_utilisateur1], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            return res.status(500).json({ error: 'Internal server error' });
        }


        if (result.length > 0) {
            return res.json({ message: 'La relation d\'amitié existe déjà entre les utilisateurs' });
        }

        return res.status(200).json({ message: 'La relation d\'amitié n\'existe pas entre les utilisateurs' });
    });
});



app.get("/friends", isAuthenticated, async (req, res) => {
    const ID_utilisateur1 = req.session.user.id;


    // Vérifiez d'abord si la relation existe déjà dans les deux sens
    const checkSql = 'SELECT ID_utilisateur2 FROM amitie WHERE ID_utilisateur1 = ?';

    db.query(checkSql, [ID_utilisateur1], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.length > 0) {
            const friendIds = result.map(row => row.ID_utilisateur2);

            // Construire la requête pour obtenir les pseudos
            const getPseudoSql = 'SELECT Pseudo FROM utilisateur WHERE ID_utilisateur IN (?)';

            db.query(getPseudoSql, [friendIds], (err, friends) => {
                if (err) {
                    console.error('Error executing query', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                return res.json(friends);
            });
        } else {
            return res.status(200).json({ message: "Aucun ami trouvé" });
        }
    });
});







app.post('/acces', isAuthenticated, async (req, res) => {
    res.send('Accès autorisé');
});



app.post('/create_ami', (req, res) => {

    const ID_utilisateur1 = req.session.user.id;
    console.log(ID_utilisateur1);
    const { champ } = req.body;
    console.log(champ);

    // Insérez une nouvelle ligne dans la table amitie
    const insertSql = 'INSERT INTO `amitie` (`ID_utilisateur1`, `ID_utilisateur2`) VALUES (?, (SELECT ID_utilisateur FROM utilisateur WHERE Pseudo=?));';

    db.query(insertSql, [ID_utilisateur1, champ], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        return res.status(201).json({ message: 'Relation d\'amitié créée avec succès' });
    });
});


app.post('/delete_ami', (req, res) => {
    const ID_utilisateur1 = req.session.user.id;
    console.log(ID_utilisateur1);
    const { pseudo } = req.body;
    console.log(pseudo);
    // Supprimer la relation d'amitié de la table amitie
    const deleteSql = 'DELETE FROM amitie WHERE (ID_utilisateur1 = ? AND ID_utilisateur2 = (SELECT ID_utilisateur FROM utilisateur WHERE Pseudo =?)) OR (ID_utilisateur1 = (SELECT ID_utilisateur FROM utilisateur WHERE Pseudo =?) AND ID_utilisateur2 = ?)';

    db.query(deleteSql, [ID_utilisateur1, pseudo, pseudo, ID_utilisateur1], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Relation d\'amitié non trouvée' });
        }

        return res.status(200).json({ message: 'Relation d\'amitié supprimée avec succès' });
    });
});


app.post('/ajout_dispo', (req, res) => {
    const ID_utilisateur = req.session.user.id;
    const { jour, heure_debut, heure_fin } = req.body;
    // Mettre à jour la disponibilité de l'utilisateur
    const updateSql = 'INSERT INTO `disponibilite`(`ID_Utilisateur`, `Jour`, `Heure_debut`, `Heure_fin`) VALUES (?,?,?,?)';
    db.query(updateSql, [ID_utilisateur, jour, heure_debut, heure_fin], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        return res.status(200).json({ message: 'Disponibilité modifiée avec succès' });
    });
});


app.post('/verif_dispo', (req, res) => {
    const ID_utilisateur = req.session.user.id;
    const { jour } = req.body;

    // Mettre à jour la disponibilité de l'utilisateur
    const updateSql = 'SELECT COUNT(*) AS occurence FROM disponibilite WHERE ID_Utilisateur = ? AND Jour=?';
    db.query(updateSql, [ID_utilisateur, jour], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        return res.status(200).send(result[0]);
    });
});


app.post('/modif_dispo', (req, res) => {
    const ID_utilisateur = req.session.user.id;
    const { jour, heure_debut, heure_fin } = req.body;

    // Mettre à jour la disponibilité de l'utilisateur
    const updateSql = 'UPDATE disponibilite SET Heure_debut = ?, Heure_fin = ? WHERE ID_Utilisateur = ? AND Jour = ?';
    db.query(updateSql, [heure_debut, heure_fin, ID_utilisateur, jour], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).send("Disponibilité modifiée avec succès");
    });
});




app.post("/delete_dispo", (req, res) => {


    const ID_utilisateur = req.session.user.id;
    const { jour } = req.body;
    // Supprimer la disponibilité de l'utilisateur
    const deleteSql = 'DELETE FROM disponibilite WHERE ID_Utilisateur = ? AND Jour = ?';

    db.query(deleteSql, [ID_utilisateur, jour], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (result.affectedRows === 0) {
            return res.status(203).json({ message: 'Disponibilité non trouvée' });
        }

        return res.status(200).json({ message: 'Disponibilité supprimée avec succès' });
    });

});


app.get('/get_pseudo', isAuthenticated, async (req, res) => {
    try {
        const ID_user = req.session.user.id;
        const [rows] = await db.promise().query('SELECT Pseudo FROM utilisateur WHERE ID_utilisateur = ?', [ID_user]);
        res.send(rows[0]);
    } catch (err) {
        console.error("Erreur lors de la récupération du pseudo : ", err);
        res.status(500).send('Erreur serveur');
    }
});









// Route pour supprimer une disponibilité
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});


