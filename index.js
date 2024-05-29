

//requiert les modules necessaires
const express = require('express');
const port = process.env.PORT || 3000;
const mysql = require('mysql');
const bcrypt = require('bcrypt');


//creation de l'application express
const app = express();

//affiche un message si le serveur est bien lancé
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




//requete get pour afficher les données de la table users
app.post('/connexion', (req, res) => {

    //creation de la connexion
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'hangout',
    });

    //connexion à la base de données
    connection.connect((err) => {
        if (err) {
            console.log('Error connecting to Db');
            return;
        }
        console.log('Connection established');
    });

    //requete pour afficher les données de la table users
    connection.query('INSERT INTO utilisateur (`ID_Utilisateur`, `PSEUDO`, `PASSWORD_USER`, `DESCRIPTION_USER`, `IMAGE_USER`, `HISTORIQUE_SORTIES`, `WISHLIST`) VALUES (NULL, "hugo", "test", "salut", "img", "lille", "lille centre")', (err, rows) => {
        if (err) {
            console.log("requete impossible");
            return;
        } 
        else{
            console.log("requete reussie");
            res.send(rows);
        }

    });
    //fermeture de la connexion
    connection.end();
});

///



app.get('/hello', (req, res) => {
    res.send('Hello World');  

    
});