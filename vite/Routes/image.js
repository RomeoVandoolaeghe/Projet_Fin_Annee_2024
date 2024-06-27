
const express = require("express");
const multer = require("multer");
const mysql = require("mysql");
const router = express.Router();
const pool = require('../db'); // Assurez-vous que le chemin est correct

// Configuration de multer pour gérer les téléchargements d'images
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Route pour insérer une image

router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Aucun fichier téléchargé.');
    }
    const image = req.file.buffer; // Le fichier image est accessible dans req.file.buffer

    console.log(image);

    const sql4 = 'UPDATE utilisateur SET Image = ? WHERE ID_Utilisateur = "4";';
    pool.query(sql4, [image], (err, result) => {
        if (err) {
            console.error("Erreur lors de l'insertion de l'image:", err);
        
        }
        res.send('Succès');
    });
});




module.exports = router;

