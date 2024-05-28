CREATE TABLE Utilisateur (
    ID_Utilisateur INT PRIMARY KEY AUTO_INCREMENT,
    PSEUDO VARCHAR(255),
    PASSWORD_USER VARCHAR(255),
    DESCRIPTION_USER TEXT,
    IMAGE_USER VARCHAR(255),
    HISTORIQUE_SORTIES TEXT,
    WISHLIST TEXT
);


CREATE TABLE Sortie (
    ID_Sortie INT PRIMARY KEY AUTO_INCREMENT,
    Date_Sortie DATETIME,
    Durée INT,
    nb_personnes INT,
    Description_Sortie TEXT,
    Lieu VARCHAR(255),
    IMAGE_Sortie VARCHAR(255),
    ID_Utilisateur INT,
    FOREIGN KEY (ID_Utilisateur) REFERENCES Utilisateur(ID_Utilisateur)
);


CREATE TABLE AMITIE(
    ID_Utilisateur1 INT,
    ID_Utilisateur2 INT,
    PRIMARY KEY (ID_Utilisateur1, ID_Utilisateur2),
    FOREIGN KEY (ID_Utilisateur1) REFERENCES Utilisateur(ID_Utilisateur),
    FOREIGN KEY (ID_Utilisateur2) REFERENCES Utilisateur(ID_Utilisateur)
);

CREATE TABLE PARTICIPATION(
    ID_Utilisateur INT,
    ID_Sortie INT,
    PRIMARY KEY (ID_Utilisateur, ID_Sortie),
    FOREIGN KEY (ID_Utilisateur) REFERENCES Utilisateur(ID_Utilisateur),
    FOREIGN KEY (ID_Sortie) REFERENCES Sortie(ID_Sortie)
);


CREATE TABLE GROUPE(
    ID_Groupe INT PRIMARY KEY AUTO_INCREMENT,
    Nom_Groupe VARCHAR(255)
);

CREATE TABLE MEMBRE_GROUPE(
    ID_Utilisateur INT,
    ID_Groupe INT,
    IS_ADMIN BOOLEAN
);


CREATE TABLE DISPONIBILITE(
    ID_Utilisateur INT,
    Date_Dispo_debut DATETIME,
    Date_Dispo_fin DATETIME,
    PRIMARY KEY (ID_Utilisateur, Date_Dispo_debut, Date_Dispo_fin),
    FOREIGN KEY (ID_Utilisateur) REFERENCES Utilisateur(ID_Utilisateur)
);


CREATE TABLE MESSAGE_SORTIE(
    ID_Message INT PRIMARY KEY AUTO_INCREMENT,
    Date_Envoi DATETIME,
    Contenu TEXT,
    ID_Utilisateur INT,
    ID_Sortie INT,
    FOREIGN KEY (ID_Utilisateur) REFERENCES Utilisateur(ID_Utilisateur),
    FOREIGN KEY (ID_Sortie) REFERENCES Sortie(ID_Sortie)
);


CREATE TABLE VOTE (
    ID_VOTE INT PRIMARY KEY AUTO_INCREMENT,
    ID_Sortie INT,
    ID_Utilisateur INT,
    ID_Choix INT,
    Date_vote DATETIME,
    duree_vote INT,
    FOREIGN KEY (ID_Sortie) REFERENCES Sortie(ID_Sortie),
    FOREIGN KEY (ID_Utilisateur) REFERENCES Utilisateur(ID_Utilisateur),
    UNIQUE (ID_Choix, ID_Utilisateur)
);


CREATE TABLE CHOIX_VOTE (
    ID_Choix INT PRIMARY KEY AUTO_INCREMENT,
    ID_Vote INT,
    choix_description VARCHAR(255),
    FOREIGN KEY (ID_Vote) REFERENCES VOTE(ID_VOTE)
);





