const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const pool = require('../db'); // Assurez-vous que le chemin est correct

// Route de vérification
router.post('/search_utilisateur', (req, res) => {
  const { champ } = req.body;
  const sql = 'SELECT * FROM utilisateur WHERE Pseudo = ?';

  pool.query(sql, [champ], (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    if(result.length != 0){

      res.send(result);
      console.log(result); // Cette requête renvoie le profil de l'utilisateur 
    }
  });
});


router.post('/search_utilisateur_id', (req, res) => {
  const { champ } = req.body;
  const sql = 'SELECT ID_utilisateur FROM utilisateur WHERE Pseudo = ?';

  pool.query(sql, [champ], (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    return res.status(200).json({ ID_utilisateur: result[0].ID_utilisateur });
  });
});



router.post('/Check_ami', (req, res) => {
  const { ID_utilisateur1,ID_utilisateur2  } = req.body;

  // Vérifiez d'abord si la relation existe déjà dans les deux sens
  const checkSql =' SELECT * FROM amitie WHERE ((ID_utilisateur1 = ? AND ID_utilisateur2 = ?) OR (ID_utilisateur1 = ? AND ID_utilisateur2 = ?))';
  
  pool.query(checkSql, [ID_utilisateur1,ID_utilisateur2,ID_utilisateur2,ID_utilisateur1], (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: 'La relation d\'amitié existe déjà entre les utilisateurs' });
    }

    if (result.length === 0) {
      console.log("La relation d'amitié n'existe pas");
      res.send(result);
    }

  });
});


router.post('/create_ami', (req, res) => {
  const { ID_utilisateur1, ID_utilisateur2 } = req.body;

  // Insérez une nouvelle ligne dans la table amitie
  const insertSql = 'INSERT INTO `amitie` (`ID_utilisateur1`, `ID_utilisateur2`) VALUES (?, ?);';

  pool.query(insertSql, [ID_utilisateur1, ID_utilisateur2], (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(201).json({ message: 'Relation d\'amitié créée avec succès' });
  });
});


router.post('/delete_ami', (req, res) => {
  const { ID_utilisateur1, ID_utilisateur2 } = req.body;

  // Supprimer la relation d'amitié de la table amitie
  const deleteSql = 'DELETE FROM amitie WHERE (ID_utilisateur1 = ? AND ID_utilisateur2 = ?) OR (ID_utilisateur1 = ? AND ID_utilisateur2 = ?)';

  pool.query(deleteSql, [ID_utilisateur1, ID_utilisateur2, ID_utilisateur2, ID_utilisateur1], (err, result) => {
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


router.post('/get_amis', (req, res) => {
  const { ID_utilisateur } = req.body;


  pool.query(sql, [ID_utilisateur, ID_utilisateur], (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'Aucun ami trouvé' });
    }

    return res.status(200).json(result);
  });
});


























module.exports = router;


