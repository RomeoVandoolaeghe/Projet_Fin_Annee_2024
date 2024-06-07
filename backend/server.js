const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration pour l'upload de fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

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

app.post('/parametres', upload.single('photo'), (req, res) => {
    const photo = req.file ? req.file.filename : null;
    const userId = 1; // Remplacez par l'ID utilisateur approprié

    if (photo) {
        const sql = 'UPDATE Utilisateur SET Image = ? WHERE ID_Utilisateur = ?';
        db.query(sql, [photo, userId], (err, result) => {
            if (err) {
                console.error('Erreur lors de la mise à jour de l\'image:', err);
                res.status(500).send('Erreur du serveur');
                return;
            }
            res.status(200).send('Image mise à jour avec succès');
        });
    } else {
        res.status(400).send('Aucune image téléchargée');
    }
});

const port = 3001;
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
