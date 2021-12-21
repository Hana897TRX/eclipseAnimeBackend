SET FOREIGN_KEY_CHECKS = 0;
DROP DATABASE IF EXISTS EclipseAnime;
CREATE DATABASE EclipseAnime;
USE EclipseAnime;

-- ESTA TABLA CONTIENE LOS GENEROS ORIGINALES EN INGLES
DROP TABLE IF EXISTS Genres;
CREATE TABLE Genres(
    genre_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    genreName VARCHAR(50)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS Languages;
CREATE TABLE Languages(
    language_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    language_key VARCHAR(10), -- EN, ES, ES-MX
    language_name VARCHAR(50) -- English, Español, Español-Mexico
) ENGINE=InnoDB;

DROP TABLE IF EXISTS AnimeType;
CREATE TABLE AnimeType(
    type_id INT PRIMARY KEY AUTO_INCREMENT,
    animeType VARCHAR(50)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS Servers;
CREATE TABLE Servers(
    server_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    serverName VARCHAR(25),
    serverLink VARCHAR(255),
    serverLanguage_id INT,

    FOREIGN KEY (serverLanguage_id) REFERENCES Languages(language_id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=INNODB;

DROP TABLE IF EXISTS Anime;
CREATE TABLE Anime(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT
    anime_id INT NOT NULL,
    server_id INT,
    anime_type_id INT,
    animeName VARCHAR(255),
    longName VARCHAR(255),
    synopsis TEXT,
    imgCover VARCHAR(255),
    imgPoster VARCHAR(255),
    totalVotes INT,
    rating FLOAT,

    FOREIGN KEY (anime_type_id) REFERENCES AnimeType(type_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (server_id) REFERENCES Servers(server_id) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;


DROP TABLE IF EXISTS AnimeGenres;
CREATE TABLE AnimeGenres(
    id INT PRIMARY KEY AUTO_INCREMENT,
    anime_id INT,
    gentrans_id INT,

    FOREIGN KEY (anime_id) REFERENCES Anime(anime_id) ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (gentrans_id) REFERENCES Genres(genre_id) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;


DROP TABLE IF EXISTS AnimeChapters;
CREATE TABLE AnimeChapters(
    chapter_id INT PRIMARY KEY AUTO_INCREMENT,
    anime_id INT,
    imagePath VARCHAR(255),
    chapterNumber VARCHAR(25),
    animeLink VARCHAR(255),

    FOREIGN KEY (anime_id) REFERENCES Anime (anime_id) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE=InnoDB;

-- ESTA TABLA CONTIENE LA RELACIÓN DE LOS GENEROS ORIGINALES CON LAS TRADUCCIONES
DROP TABLE IF EXISTS GenresTrans;
CREATE TABLE GenresTrans (
    translation_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    genre_id INT, 
    language_id INT, 
    genre_translation VARCHAR(50),

    FOREIGN KEY (translation_id) REFERENCES Genres(genre_id) ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (language_id) REFERENCES Languages(language_id) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;