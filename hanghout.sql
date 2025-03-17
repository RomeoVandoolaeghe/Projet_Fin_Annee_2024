-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : lun. 17 mars 2025 à 16:28
-- Version du serveur :  5.7.24
-- Version de PHP : 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `hanghout`
--

-- --------------------------------------------------------

--
-- Structure de la table `amitie`
--

CREATE TABLE `amitie` (
  `ID_utilisateur1` int(11) NOT NULL,
  `ID_utilisateur2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `amitie`
--

INSERT INTO `amitie` (`ID_utilisateur1`, `ID_utilisateur2`) VALUES
(14, 13),
(13, 14);

-- --------------------------------------------------------

--
-- Structure de la table `disponibilite`
--

CREATE TABLE `disponibilite` (
  `ID_Utilisateur` int(11) NOT NULL,
  `Jour` varchar(255) NOT NULL,
  `Heure_debut` time NOT NULL,
  `Heure_fin` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `disponibilite`
--

INSERT INTO `disponibilite` (`ID_Utilisateur`, `Jour`, `Heure_debut`, `Heure_fin`) VALUES
(13, 'Mardi', '09:00:00', '16:00:00'),
(14, 'Lundi', '12:00:00', '15:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `groupe`
--

CREATE TABLE `groupe` (
  `ID_Groupe` int(11) NOT NULL,
  `Nom_Groupe` varchar(255) NOT NULL,
  `ID_Creator` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `groupe`
--

INSERT INTO `groupe` (`ID_Groupe`, `Nom_Groupe`, `ID_Creator`) VALUES
(1, 'Musée', 14),
(2, 'Musée', 15);

-- --------------------------------------------------------

--
-- Structure de la table `membre_groupe`
--

CREATE TABLE `membre_groupe` (
  `ID_Utilisateur` int(11) DEFAULT NULL,
  `ID_Groupe` int(11) DEFAULT NULL,
  `IS_ADMIN` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `membre_groupe`
--

INSERT INTO `membre_groupe` (`ID_Utilisateur`, `ID_Groupe`, `IS_ADMIN`) VALUES
(14, 1, 0),
(13, 1, 0),
(15, 2, 0);

-- --------------------------------------------------------

--
-- Structure de la table `message_groupe`
--

CREATE TABLE `message_groupe` (
  `ID_Message` int(11) NOT NULL,
  `Date_Envoi` datetime DEFAULT NULL,
  `Contenu` text,
  `ID_Utilisateur` int(11) DEFAULT NULL,
  `ID_Groupe` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `message_groupe`
--

INSERT INTO `message_groupe` (`ID_Message`, `Date_Envoi`, `Contenu`, `ID_Utilisateur`, `ID_Groupe`) VALUES
(1, '2024-06-28 10:21:24', 'Bonjour', 14, 1);

-- --------------------------------------------------------

--
-- Structure de la table `participation`
--

CREATE TABLE `participation` (
  `ID_Utilisateur` int(11) NOT NULL,
  `ID_Sortie` int(11) NOT NULL,
  `PARTICIPATE` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `participation`
--

INSERT INTO `participation` (`ID_Utilisateur`, `ID_Sortie`, `PARTICIPATE`) VALUES
(13, 1, 1),
(14, 1, 1),
(15, 2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('sT_eoVaiVltygr3XryJwtcJaV9wE9ykz', 1719599518, '{\"cookie\":{\"originalMaxAge\":36000000,\"expires\":\"2024-06-28T18:23:15.364Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"},\"user\":{\"id\":13}}'),
('stCZCOoUNanNHFOE4UxEtT523lmpvsN0', 1742264886, '{\"cookie\":{\"originalMaxAge\":36000000,\"expires\":\"2025-03-18T02:23:45.834Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"},\"user\":{\"id\":15}}');

-- --------------------------------------------------------

--
-- Structure de la table `sortie`
--

CREATE TABLE `sortie` (
  `ID_Sortie` int(11) NOT NULL,
  `Titre_Sortie` varchar(255) DEFAULT NULL,
  `Date_Sortie` datetime DEFAULT NULL,
  `Duree` int(11) DEFAULT NULL,
  `nb_personnes` int(11) DEFAULT '0',
  `Description_Sortie` text,
  `Lieu` varchar(255) DEFAULT NULL,
  `ID_Creator` int(11) DEFAULT NULL,
  `ID_Groupe` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `sortie`
--

INSERT INTO `sortie` (`ID_Sortie`, `Titre_Sortie`, `Date_Sortie`, `Duree`, `nb_personnes`, `Description_Sortie`, `Lieu`, `ID_Creator`, `ID_Groupe`) VALUES
(1, 'Musée  du Louvre', '2024-07-02 12:00:00', 120, 2, 'Visite', 'Paris', 14, 1),
(2, 'Musée', '2025-03-29 21:29:00', 120, 1, 'visite', 'Paris', 15, 2);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `ID_utilisateur` int(11) NOT NULL,
  `Pseudo` varchar(255) NOT NULL,
  `Mail` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Description` text,
  `IS_ADMIN` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`ID_utilisateur`, `Pseudo`, `Mail`, `Password`, `Description`, `IS_ADMIN`) VALUES
(14, 'hugo', 'hugo@gmail.com', '$2b$10$ii66LB9KTfX3BF48w5HBKeGrANk95p863vrefMb41qxgCYaLdtaxe', 'blabla', 0),
(15, 'Romeo', 'romeo@gmail.com', '$2b$10$Wh2U4D1/8MCDqbpNi.4ES.21q.9zmW0xyZUypAlD7H9/WCdPF.5Ke', NULL, 0);

-- --------------------------------------------------------

--
-- Structure de la table `wishlist`
--

CREATE TABLE `wishlist` (
  `ID_Wishlist` int(11) NOT NULL,
  `Nom_Lieu` text,
  `ID_Utilisateur` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `amitie`
--
ALTER TABLE `amitie`
  ADD PRIMARY KEY (`ID_utilisateur1`,`ID_utilisateur2`),
  ADD KEY `ID_utilisateur2` (`ID_utilisateur2`);

--
-- Index pour la table `disponibilite`
--
ALTER TABLE `disponibilite`
  ADD PRIMARY KEY (`ID_Utilisateur`,`Jour`,`Heure_debut`,`Heure_fin`);

--
-- Index pour la table `groupe`
--
ALTER TABLE `groupe`
  ADD PRIMARY KEY (`ID_Groupe`),
  ADD KEY `ID_Utilisateur` (`ID_Creator`);

--
-- Index pour la table `membre_groupe`
--
ALTER TABLE `membre_groupe`
  ADD KEY `ID_Utilisateur` (`ID_Utilisateur`),
  ADD KEY `ID_Groupe` (`ID_Groupe`);

--
-- Index pour la table `message_groupe`
--
ALTER TABLE `message_groupe`
  ADD PRIMARY KEY (`ID_Message`),
  ADD KEY `ID_Utilisateur` (`ID_Utilisateur`),
  ADD KEY `ID_Groupe` (`ID_Groupe`);

--
-- Index pour la table `participation`
--
ALTER TABLE `participation`
  ADD PRIMARY KEY (`ID_Utilisateur`,`ID_Sortie`),
  ADD KEY `ID_Sortie` (`ID_Sortie`);

--
-- Index pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Index pour la table `sortie`
--
ALTER TABLE `sortie`
  ADD PRIMARY KEY (`ID_Sortie`),
  ADD KEY `ID_Creator` (`ID_Creator`),
  ADD KEY `ID_Groupe` (`ID_Groupe`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`ID_utilisateur`);

--
-- Index pour la table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`ID_Wishlist`),
  ADD KEY `ID_Utilisateur` (`ID_Utilisateur`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `groupe`
--
ALTER TABLE `groupe`
  MODIFY `ID_Groupe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `message_groupe`
--
ALTER TABLE `message_groupe`
  MODIFY `ID_Message` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `sortie`
--
ALTER TABLE `sortie`
  MODIFY `ID_Sortie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `ID_utilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `ID_Wishlist` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `amitie`
--
ALTER TABLE `amitie`
  ADD CONSTRAINT `amitie_ibfk_1` FOREIGN KEY (`ID_utilisateur1`) REFERENCES `utilisateur` (`ID_utilisateur`),
  ADD CONSTRAINT `amitie_ibfk_2` FOREIGN KEY (`ID_utilisateur2`) REFERENCES `utilisateur` (`ID_utilisateur`);

--
-- Contraintes pour la table `disponibilite`
--
ALTER TABLE `disponibilite`
  ADD CONSTRAINT `disponibilite_ibfk_1` FOREIGN KEY (`ID_Utilisateur`) REFERENCES `utilisateur` (`ID_utilisateur`);

--
-- Contraintes pour la table `membre_groupe`
--
ALTER TABLE `membre_groupe`
  ADD CONSTRAINT `membre_groupe_ibfk_1` FOREIGN KEY (`ID_Utilisateur`) REFERENCES `utilisateur` (`ID_utilisateur`) ON DELETE CASCADE,
  ADD CONSTRAINT `membre_groupe_ibfk_2` FOREIGN KEY (`ID_Groupe`) REFERENCES `groupe` (`ID_Groupe`) ON DELETE CASCADE;

--
-- Contraintes pour la table `message_groupe`
--
ALTER TABLE `message_groupe`
  ADD CONSTRAINT `message_groupe_ibfk_1` FOREIGN KEY (`ID_Utilisateur`) REFERENCES `utilisateur` (`ID_utilisateur`),
  ADD CONSTRAINT `message_groupe_ibfk_2` FOREIGN KEY (`ID_Groupe`) REFERENCES `groupe` (`ID_Groupe`);

--
-- Contraintes pour la table `participation`
--
ALTER TABLE `participation`
  ADD CONSTRAINT `participation_ibfk_1` FOREIGN KEY (`ID_Utilisateur`) REFERENCES `utilisateur` (`ID_utilisateur`),
  ADD CONSTRAINT `participation_ibfk_2` FOREIGN KEY (`ID_Sortie`) REFERENCES `sortie` (`ID_Sortie`) ON DELETE CASCADE;

--
-- Contraintes pour la table `sortie`
--
ALTER TABLE `sortie`
  ADD CONSTRAINT `sortie_ibfk_1` FOREIGN KEY (`ID_Creator`) REFERENCES `utilisateur` (`ID_utilisateur`),
  ADD CONSTRAINT `sortie_ibfk_2` FOREIGN KEY (`ID_Groupe`) REFERENCES `groupe` (`ID_Groupe`);

--
-- Contraintes pour la table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`ID_Utilisateur`) REFERENCES `utilisateur` (`ID_utilisateur`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
