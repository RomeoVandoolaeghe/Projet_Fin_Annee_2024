

//requiert les modules necessaires
const express = require('express');
const port = process.env.PORT || 3000;
const mysql = require('mysql');

//creation de l'application express
const app = express();

//affiche un message si le serveur est bien lancé
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




//requete get pour afficher les données de la table users
app.get('/', (req, res) => {

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
    connection.query('SELECT * FROM utilisateur', (err, rows) => {
        if (err) {
            console.log("requete impossible");
            return;
        }
        else{
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