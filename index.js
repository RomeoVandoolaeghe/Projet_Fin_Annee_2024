const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require("express-session");
require('dotenv').config();
const MySQLStore = require('express-mysql-session')(session);



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
        maxAge: 36000000,
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
        res.status(200).send('Utilisateur enregistré avec succès');
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




app.post("/verif_ami", isAuthenticated, (req, res) => {
    const ID_utilisateur1 = req.session.user.id; // ID de l'utilisateur actuel
    console.log("ID de l'utilisateur actuel:", ID_utilisateur1);
    const { champ } = req.body; // Pseudo de l'utilisateur à rechercher
    console.log("Pseudo de l'utilisateur à rechercher:", champ);
    // Requête SQL combinée
    const checkSql = `
      SELECT * FROM amitie
      WHERE ((ID_utilisateur1 = ? AND ID_utilisateur2 = (SELECT ID_utilisateur FROM utilisateur WHERE Pseudo = ?))
         OR (ID_utilisateur1 = (SELECT ID_utilisateur FROM utilisateur WHERE Pseudo = ?) AND ID_utilisateur2 = ?))`;

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
    return res.status(200).send('Accès autorisé');

});



app.post('/create_ami', isAuthenticated, (req, res) => {

    const ID_utilisateur1 = req.session.user.id;
    console.log(ID_utilisateur1);
    const { champ } = req.body;
    console.log(champ);

    // Insérez une nouvelle ligne dans la table amitie
    const insertSql1 = 'INSERT INTO `amitie` (`ID_utilisateur1`, `ID_utilisateur2`) VALUES (?, (SELECT ID_utilisateur FROM utilisateur WHERE Pseudo=?)) ;';
    const insertSql2 = 'INSERT INTO `amitie` (`ID_utilisateur2`, `ID_utilisateur1`) VALUES (?, (SELECT ID_utilisateur FROM utilisateur WHERE Pseudo=?));';
    db.query(insertSql1, [ID_utilisateur1, champ], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        db.query(insertSql2, [ID_utilisateur1, champ], (err, result) => {
            if (err) {
                console.error('Error executing query', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });

        return res.status(201).json({ message: 'Relation d\'amitié créée avec succès' });
    });
});


app.post('/delete_ami', isAuthenticated, (req, res) => {
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


app.post('/ajout_dispo', isAuthenticated, (req, res) => {
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


app.post('/verif_dispo', isAuthenticated, (req, res) => {
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


app.post('/modif_dispo', isAuthenticated, (req, res) => {
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




app.post("/delete_dispo", isAuthenticated, (req, res) => {


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

app.get('/get_pseudo/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.promise().query('SELECT Pseudo FROM utilisateur WHERE ID_utilisateur = ?', [id]);
        res.send(rows[0]);
    } catch (err) {
        console.error("Erreur lors de la récupération du pseudo : ", err);
        res.status(500).send('Erreur serveur');
    }
});


app.get('/recup_dispo', isAuthenticated, async (req, res) => {
    try {
        const ID_user = req.session.user.id;
        const [rows] = await db.promise().query("SELECT * FROM disponibilite WHERE ID_Utilisateur = ? ORDER BY CASE Jour WHEN 'Lundi' THEN 1 WHEN 'Mardi' THEN 2 WHEN 'Mercredi' THEN 3 WHEN 'Jeudi' THEN 4 WHEN 'Vendredi' THEN 5 WHEN 'Samedi' THEN 6 WHEN 'Dimanche' THEN 7  END ASC", [ID_user]);
        res.send(rows);
    } catch (err) {
        console.error("Erreur lors de la récupération du pseudo : ", err);
        res.status(500).send('Erreur serveur');
    }
});



app.get('/recup_description', isAuthenticated, async (req, res) => {
    try {
        const ID_user = req.session.user.id;
        const [rows] = await db.promise().query('SELECT Description FROM utilisateur WHERE ID_utilisateur = ?', [ID_user]);
        res.send(rows[0]);
    } catch (err) {
        console.error("Erreur lors de la récupération de la description ", err);
        res.status(500).send('Erreur serveur');
    }
});



app.post('/edit_description', isAuthenticated, async (req, res) => {

    const ID_utilisateur = req.session.user.id;
    const { description } = req.body;

    const editSql = 'UPDATE utilisateur SET Description = ? WHERE ID_utilisateur = ?;';

    db.query(editSql, [description, ID_utilisateur], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        return res.status(200).json({ message: 'Description a bien été inséré' });
    });
});



app.post('/edit_wishlist', isAuthenticated, async (req, res) => {

    const ID_utilisateur = req.session.user.id;
    const { place } = req.body;

    const editSql = 'UPDATE utilisateur SET Wishlist = ? WHERE ID_utilisateur = ?;';

    db.query(editSql, [place, ID_utilisateur], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        return res.status(200).json({ message: 'Wishlist a bien été updater' });
    });
});


app.post('/create_group', isAuthenticated, async (req, res) => {

    const { nom_groupe } = req.body;
    console.log(nom_groupe);
    const ID_user = req.session.user.id;
    console.log(ID_user);
    const editSql = 'INSERT INTO groupe (Nom_Groupe,ID_Creator) VALUES (?,?)';

    db.query(editSql, [nom_groupe, ID_user], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        return res.status(200).json({ message: 'Le groupe a bien été crée' });
    });

});


app.post('/add_member', isAuthenticated, async (req, res) => {

    const ID_utilisateur = req.session.user.id;
    const { nomgroupe } = req.body;
    console.log(nomgroupe);
    const bool = 0;
    const editSql = 'INSERT INTO membre_groupe (ID_Utilisateur, ID_Groupe, IS_ADMIN) VALUES (?,(SELECT ID_Groupe FROM groupe WHERE Nom_Groupe=? AND ID_Creator=?), ?)';

    db.query(editSql, [ID_utilisateur, nomgroupe, ID_utilisateur, bool], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        return res.status(200).json({ message: 'Membre ajouté au groupe' });
    });
});


app.get('/recup_group', isAuthenticated, async (req, res) => {

    try {
        const ID_user = req.session.user.id;
        const [rows] = await db.promise().query('SELECT Nom_Groupe, ID_Groupe FROM groupe WHERE ID_Groupe IN (SELECT ID_Groupe FROM `membre_groupe` WHERE ID_Utilisateur = ?)', [ID_user]);
        res.send(rows);
        // console.log(rows);
    } catch (err) {
        console.error("Erreur lors de la récupération des groupes ", err);
        res.status(500).send('Erreur serveur');
    }
});


app.get('/recup_message/:groupID', isAuthenticated, async (req, res) => {
    const { groupID } = req.params;

    try {
        const sql = `
            SELECT message_groupe.ID_Message, message_groupe.Contenu, utilisateur.Pseudo
            FROM message_groupe
            INNER JOIN utilisateur ON message_groupe.ID_Utilisateur = utilisateur.ID_utilisateur
            WHERE message_groupe.ID_Groupe = ?
            ORDER BY message_groupe.ID_Message ASC
        `;
        db.query(sql, [groupID], (err, results) => {
            if (err) {
                console.error('Erreur lors de la récupération des messages:', err);
                return res.status(500).send('Erreur serveur');
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Erreur serveur:', error);
        res.status(500).send('Erreur serveur');
    }
});




app.post('/send_messages', isAuthenticated, (req, res) => {
    const ID_Utilisateur = req.session.user.id;
    const { Contenu, ID_Groupe } = req.body;
    console.log(Contenu);
    console.log(ID_Groupe);
    const query = 'INSERT INTO message_groupe (Contenu, Date_Envoi, ID_Utilisateur, ID_Groupe) VALUES (?, NOW(), ?, ?)';
    db.query(query, [Contenu, ID_Utilisateur, ID_Groupe], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'envoi du message:', err);
            res.status(500).send(err);
            return;
        }
        res.send({ message: 'Message envoyé avec succès', ID_Utilisateur: ID_Utilisateur });
    });
});



app.post('/creer_sortie', isAuthenticated, (req, res) => {
    const ID_Creator = req.session.user.id;
    const { title, date, duree, description, lieu, ID_Groupe } = req.body;
    console.log(title);
    console.log(date);
    console.log(duree);
    console.log(description);
    console.log(lieu);
    console.log(ID_Groupe);


    // Convertir la date de la sortie en objet Date
    const dateSortie = new Date(date);
    const dateActuelle = new Date();

    console.log('date sortie', dateSortie);
    console.log('date actuelle', dateActuelle);

    // Vérifier que la date de la sortie est dans le futur
    if (dateSortie <= dateActuelle) {
        res.status(201).send('La sortie doit être dans le futur!');
        console.log('La date de la sortie doit être supérieure à la date actuelle.');
        return;
    }

    const query = 'INSERT INTO sortie (ID_Creator, Titre_Sortie, Date_Sortie, Duree, Description_Sortie, Lieu, ID_Groupe) VALUES (?, ?, ?, ?, ?, ?,?)';

    db.query(query, [ID_Creator, title, date, duree, description, lieu, ID_Groupe], (err, results) => {
        if (err) {
            console.error('Erreur lors de la création de la sortie:', err);
            res.status(500).send(err);
            return;
        }
        res.status(200).send({ message: 'Sortie créée avec succès', ID_Creator: ID_Creator });
    });
})

// Route pour supprimer une disponibilité
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});




// Route pour récupérer les sorties passées
// app.get('/sorties', isAuthenticated, (req, res) => {
//     const sql = 'SELECT * FROM sortie WHERE Date_Sortie < NOW()';
//     db.query(sql, (err, result) => {
//         if (err) {
//             console.error('Erreur lors de la récupération des sorties:', err);
//             return res.status(500).send(err);
//         }
//         res.json(result);
//     });
// });



app.get('/amis2', isAuthenticated, async (req, res) => {
    const ID_user = req.session.user.id;

    if (!ID_user) {
        return res.status(400).send('ID utilisateur non fourni');
    }

    try {
        const querySql = `
            SELECT DISTINCT
                u.ID_utilisateur AS AmiID, u.Pseudo AS AmiPseudo
            FROM 
                amitie a
            JOIN 
                utilisateur u ON u.ID_utilisateur = CASE 
                    WHEN a.ID_utilisateur1 = ? THEN a.ID_utilisateur2
                    WHEN a.ID_utilisateur2 = ? THEN a.ID_utilisateur1
                END
            WHERE 
                a.ID_utilisateur1 = ? OR a.ID_utilisateur2 = ?;
        `;
        db.query(querySql, [ID_user, ID_user, ID_user, ID_user], (err, rows) => {
            if (err) {
                console.error('Erreur lors de la récupération des amis:', err);
                return res.status(500).send('Erreur serveur');
            }

            if (rows.length > 0) {
                const uniqueFriends = [];
                const seen = new Set();

                rows.forEach(row => {
                    if (!seen.has(row.AmiPseudo)) {
                        seen.add(row.AmiPseudo);
                        uniqueFriends.push({
                            amiID: row.AmiID,
                            amiPseudo: row.AmiPseudo
                        });
                    }
                });

                res.json(uniqueFriends);
            } else {
                res.status(404).send('Ami non trouvé');
            }
        });
    } catch (error) {
        console.error('Erreur serveur:', error);
        res.status(500).send('Erreur serveur');
    }
});


app.get('/group_members/:groupID', isAuthenticated, async (req, res) => {
    const { groupID } = req.params;

    try {
        const sql = `
            SELECT utilisateur.ID_utilisateur, utilisateur.Pseudo 
            FROM utilisateur 
            INNER JOIN membre_groupe ON utilisateur.ID_utilisateur = membre_groupe.ID_Utilisateur 
            WHERE membre_groupe.ID_Groupe = ?
        `;
        db.query(sql, [groupID], (err, results) => {
            if (err) {
                console.error('Erreur lors de la récupération des membres du groupe:', err);
                return res.status(500).send('Erreur serveur');
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Erreur serveur:', error);
        res.status(500).send('Erreur serveur');
    }
});


app.post('/delete_group', isAuthenticated, async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).send('ID du groupe non fourni');
    }

    try {
        // Supprimer les messages du groupe
        const deleteMessagesSql = 'DELETE FROM message_groupe WHERE ID_Groupe = ?';
        db.query(deleteMessagesSql, [id], (err, result) => {
            if (err) {
                console.error('Erreur lors de la suppression des messages du groupe:', err);
                return res.status(500).send('Erreur serveur');
            }

            // Supprimer les membres du groupe
            const deleteMembersSql = 'DELETE FROM membre_groupe WHERE ID_Groupe = ?';
            db.query(deleteMembersSql, [id], (err, result) => {
                if (err) {
                    console.error('Erreur lors de la suppression des membres du groupe:', err);
                    return res.status(500).send('Erreur serveur');
                }
                db.query('DELETE FROM sortie WHERE ID_Groupe = ?', [id], (err, result) => {
                    if (err) {
                        console.error('Erreur lors de la suppression des sorties du groupe:', err);
                        return res.status(500).send('Erreur serveur');
                    }
                    const deleteGroupSql = 'DELETE FROM groupe WHERE ID_Groupe = ?';
                    db.query(deleteGroupSql, [id], (err, result) => {
                        if (err) {
                            console.error('Erreur lors de la suppression du groupe:', err);
                            return res.status(500).send('Erreur serveur');
                        }
                        res.status(200).send('Groupe supprimé avec succès');
                        if (result.affectedRows === 0) {
                            return res.status(404).send('Groupe non trouvé');
                        }
                    });
                });
            });
        });
    } catch (error) {
        console.error('Erreur serveur:', error);
        res.status(500).send('Erreur serveur');
    }
});

app.post('/add_membergroupe', (req, res) => {
    const { ID_Groupe, ID_Utilisateur } = req.body;

    if (!ID_Groupe || !ID_Utilisateur) {
        return res.status(400).send('ID_Groupe et ID_Utilisateur sont requis');
    }

    // Vérifier si l'utilisateur est déjà dans le groupe
    const checkQuery = 'SELECT * FROM membre_groupe WHERE ID_Utilisateur = ? AND ID_Groupe = ?';
    db.query(checkQuery, [ID_Utilisateur, ID_Groupe], (err, result) => {
        if (err) {
            console.error('Erreur lors de la vérification de l\'utilisateur dans le groupe :', err);
            return res.status(500).send('Erreur lors de la vérification de l\'utilisateur dans le groupe');
        }
        if (result.length > 0) {
            return res.status(400).send({ message: 'Cet utilisateur a déja été ajouter dans le groupe' });
        }

        // Insérer l'utilisateur dans le groupe
        const insertQuery = 'INSERT INTO membre_groupe (ID_Utilisateur, ID_Groupe, IS_ADMIN) VALUES (?, ?, 0)';
        db.query(insertQuery, [ID_Utilisateur, ID_Groupe], (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'insertion du membre dans le groupe :', err);
                return res.status(500).send('Erreur lors de l\'insertion du membre dans le groupe');
            }
            res.send({ message: 'Membre ajouté au groupe avec succès' });
        });
    });
});

app.get('/get_user_id', (req, res) => {
    const { pseudo } = req.query;

    db.query('SELECT ID_utilisateur FROM utilisateur WHERE Pseudo = ?', [pseudo], (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération de l\'ID utilisateur :', err);
            return res.status(500).send('Erreur lors de la récupération de l\'ID utilisateur');
        }
        if (result.length > 0) {
            res.send({ id: result[0].ID_utilisateur });
        } else {
            res.status(404).send('Utilisateur non trouvé');
        }
    });
});


app.post('/delete_group_member', (req, res) => {
    const { ID_Utilisateur, ID_Groupe } = req.body;

    if (!ID_Utilisateur || !ID_Groupe) {
        return res.status(400).send('ID_Utilisateur et ID_Groupe sont requis');
    }

    const query = 'DELETE FROM membre_groupe WHERE ID_Utilisateur = ? AND ID_Groupe = ?';
    db.query(query, [ID_Utilisateur, ID_Groupe], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression du membre du groupe :', err);
            return res.status(500).send('Erreur lors de la suppression du membre du groupe');
        }
        res.send({ message: 'Membre supprimé du groupe avec succès' });
    });
});

app.get('/group_members', (req, res) => {
    const { groupId } = req.query;
    const ID_user = req.session.user.id;

    if (!groupId) {
        return res.status(400).send('groupId est requis');
    }

    const query = `
            SELECT mg.ID_Utilisateur, mg.ID_Groupe, u.Pseudo
            FROM membre_groupe mg
            JOIN utilisateur u ON mg.ID_Utilisateur = u.ID_utilisateur
            WHERE mg.ID_Groupe = ? AND mg.ID_Utilisateur != ?
        `;
    db.query(query, [groupId, ID_user], (err, results) => {

        if (err) {
            console.error('Erreur lors de la récupération des membres du groupe :', err);
            return res.status(500).send('Erreur lors de la récupération des membres du groupe');
        }
        res.send(results);
    });
});


// Route pour récupérer les sorties
app.get('/sorties', isAuthenticated, (req, res) => {
    const session_id = req.session.user.id;
    const sql = 'SELECT * FROM sortie JOIN participation ON sortie.ID_Sortie = participation.ID_Sortie WHERE participation.ID_Utilisateur = ? AND participation.PARTICIPATE = 1;';
    db.query(sql, [session_id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des sorties:', err);
            return res.status(500).send(err);
        }
        res.json(result);
    });
});



app.get('/invitations', isAuthenticated, (req, res) => {
    const session_id = req.session.user.id;
    const sql = 'SELECT * FROM sortie WHERE ID_Sortie NOT IN (SELECT ID_Sortie FROM participation WHERE ID_Utilisateur = ?) AND ID_Groupe IN (SELECT ID_Groupe FROM membre_groupe WHERE ID_Utilisateur = ?)';
    db.query(sql, [session_id, session_id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des invitations:', err);
            return res.status(500).send(err);
        }
        res.json(result);
    });
});


app.post('/accepter_invitation', isAuthenticated, (req, res) => {
    const session_id = req.session.user.id;
    const { ID_Sortie } = req.body;
    const sql = 'INSERT INTO participation (ID_Utilisateur, ID_Sortie, PARTICIPATE) VALUES (?,?,1);';
    db.query(sql, [session_id, ID_Sortie], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'acceptation de l\'invitation:', err);
            return res.status(500).send(err);
        }
        db.query('UPDATE sortie SET nb_personnes = nb_personnes + 1 WHERE ID_Sortie = ?', [ID_Sortie], (err, result) => {
            if (err) {
                console.error('Erreur lors de la mise à jour du nombre de participants:', err);
                return res.status(500).send(err);
            }
            res.send('Invitation acceptée avec succès');

        });


    });
});



app.post('/refuser_invitation', isAuthenticated, (req, res) => {
    const session_id = req.session.user.id;
    const { ID_Sortie } = req.body;
    const sql = 'INSERT INTO participation (ID_Utilisateur, ID_Sortie, PARTICIPATE) VALUES (?, ?,0);';
    db.query(sql, [session_id, ID_Sortie], (err, result) => {
        if (err) {
            console.error('Erreur lors du refus de l\'invitation:', err);
            return res.status(500).send(err);
        }
        res.send('Invitation refusée avec succès');
    });
});


app.post('/add_member_sortie_creator', isAuthenticated, (req, res) => {
    const ID_Creator = req.session.user.id;
    const { nom_sortie } = req.body;
    console.log(nom_sortie);

    const query = 'INSERT INTO participation (ID_Utilisateur, ID_Sortie,PARTICIPATE) VALUES (?, (SELECT ID_Sortie FROM sortie WHERE Titre_Sortie=? AND ID_Creator=?),1)';

    db.query(query, [ID_Creator, nom_sortie, ID_Creator], (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'ajout du membre à la sortie:', err);
            res.status(500).send({ error: 'Erreur lors de l\'ajout du membre à la sortie' });
            return;
        }

        const updateQuery = 'UPDATE sortie SET nb_personnes = nb_personnes + 1 WHERE Titre_Sortie = ? AND ID_Creator = ?';
        db.query(updateQuery, [nom_sortie, ID_Creator], (err, results) => {
            if (err) {
                console.error('Erreur lors de la mise à jour du nombre de participants:', err);
                res.status(500).send({ error: 'Erreur lors de la mise à jour du nombre de participants' });
                return;
            }
            res.send({ message: 'Membre ajouté avec succès', ID_Creator: ID_Creator });
        });
    });
});



app.post('/leave_group', isAuthenticated, (req, res) => {
    const userID = req.session.user.id
    const groupID = req.body.ID_Groupe; // ID du groupe à quitter

    const query = 'DELETE FROM membre_groupe WHERE ID_Utilisateur = ? AND ID_Groupe = ?';

    db.query(query, [userID, groupID], (err, results) => {
        if (err) {
            console.error('Erreur lors de la suppression du membre du groupe:', err);
            res.status(500).send({ error: 'Erreur lors de la suppression du membre du groupe' });
            return;
        }
        res.send({ message: 'Vous avez quitté le groupe avec succès' });
    });
});

app.post('/leave_group', isAuthenticated, (req, res) => {
    const { group_ID } = req.body;
    const userID = req.session.user.id

    // Supprimer les messages de l'utilisateur dans le groupe
    const deleteMessagesQuery = 'DELETE FROM message_groupe WHERE ID_Utilisateur = ? AND ID_Groupe = ?';

    db.query(deleteMessagesQuery, [userID, group_ID], (err, results) => {
        if (err) {
            console.error('Erreur lors de la suppression des messages de l\'utilisateur dans le groupe:', err);
            res.status(500).send({ error: 'Erreur lors de la suppression des messages de l\'utilisateur dans le groupe' });
            return;
        }

        // Supprimer l'utilisateur du groupe
        const deleteMemberQuery = 'DELETE FROM membre_groupe WHERE ID_Utilisateur = ? AND ID_Groupe = ?';

        db.query(deleteMemberQuery, [userID, group_ID], (err, results) => {
            if (err) {
                console.error('Erreur lors de la suppression de l\'utilisateur du groupe:', err);
                res.status(500).send({ error: 'Erreur lors de la suppression de l\'utilisateur du groupe' });
                return;
            }

            // Suppression de l'utilisateur du groupe dans la table principale
            const deleteGroupUserQuery = 'DELETE FROM groupe WHERE ID_Groupe = ? AND ID_Creator = ?';

            db.query(deleteGroupUserQuery, [group_ID, userID], (err, results) => {
                if (err) {
                    console.error('Erreur lors de la suppression de l\'utilisateur de la table groupe:', err);
                    res.status(500).send({ error: 'Erreur lors de la suppression de l\'utilisateur de la table groupe' });
                    return;
                }

                res.send({ message: 'Vous avez quitté le groupe avec succès' });
            });
        });
    });
});


app.get('/get_statistics', (req, res) => {
    const query = `
        SELECT 
            (SELECT COUNT(*) FROM participation) AS totalSorties,
            (SELECT COUNT(*) FROM participation WHERE PARTICIPATE = 1) AS evenementsOrganises,
            (SELECT 
                (SELECT COUNT(*) FROM participation WHERE PARTICIPATE = 1) / 
                (SELECT COUNT(*) FROM participation) * 100) AS tauxParticipation
    `;

    db.query(query, [], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des statistiques:', err);
            res.status(500).send({ error: 'Erreur lors de la récupération des statistiques' });
            return;
        }

        res.json(results[0]);
    });
});


app.get('/get_top_friends', (req, res) => {
    const userID = req.session.user.id;

    const query = `
        SELECT u.ID_utilisateur AS ID, u.Pseudo AS name, COUNT(*) as participation_count
        FROM participation p
        JOIN utilisateur u ON p.ID_Utilisateur = u.ID_utilisateur
        WHERE p.PARTICIPATE = 1 AND p.ID_Utilisateur != ?
        GROUP BY u.ID_utilisateur
        ORDER BY participation_count DESC
        LIMIT 3
    `;

    db.query(query, [userID], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des amis les plus fréquentés:', err);
            res.status(500).send({ error: 'Erreur lors de la récupération des amis les plus fréquentés' });
            return;
        }

        res.json(results);
    });
});


app.get('/get_top_places', isAuthenticated, (req, res) => {
    const userID = req.session.user.id;

    const query = `
        SELECT s.Lieu AS place, COUNT(*) as visit_count
        FROM participation p
        JOIN sortie s ON p.ID_Sortie = s.ID_Sortie
        WHERE p.PARTICIPATE = 1 AND p.ID_Utilisateur = ?
        GROUP BY s.Lieu
        ORDER BY visit_count DESC
        LIMIT 3
    `;

    db.query(query, [userID], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des lieux les plus fréquentés:', err);
            res.status(500).send({ error: 'Erreur lors de la récupération des lieux les plus fréquentés' });
            return;
        }

        console.log('Résultats de la requête /get_top_places:', results);
        res.json(results);
    });
});


app.get('/get_user_info', isAuthenticated, (req, res) => {
    const userID = req.session.user.id;

    const query = `
        SELECT IS_ADMIN
        FROM utilisateur
        WHERE ID_utilisateur = ?
    `;

    db.query(query, [userID], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des informations utilisateur:', err);
            res.status(500).send({ error: 'Erreur lors de la récupération des informations utilisateur' });
            return;
        }

        if (results.length > 0) {
            res.json({ isAdmin: results[0].IS_ADMIN });
        } else {
            res.status(404).send({ error: 'Utilisateur non trouvé' });
        }
    });
});









