DROP DATABASE IF EXISTS eclipseanime;
CREATE DATABASE IF NOT EXISTS EclipseAnime;
USE EclipseAnime;

CREATE TABLE IF NOT EXISTS AnimeTypes(
	idType INT NOT NULL auto_increment,
    animeType VARCHAR(50),
    
    PRIMARY KEY (idType)
);

DROP TABLE IF EXISTS Anime;
CREATE TABLE IF NOT EXISTS Anime(
	idAnime INT NOT NULL auto_increment,
    animeName VARCHAR(255) NOT NULL,
    animeTypeId INT NOT NULL,
    coverUrl VARCHAR(255) NOT NULL,
    splashArtUrl VARCHAR(255) NULL,
    animeDescription VARCHAR(255) NULL,
    publishDate DATE NOT NULL,
    likes INT NOT NULL,
    creators VARCHAR(255) NOT NULL,
    
    PRIMARY KEY (idAnime),
    FOREIGN KEY (animeTypeId) REFERENCES AnimeTypes(idType)
);

CREATE TABLE IF NOT EXISTS Languages(
	idLanguage INT NOT NULL auto_increment,
    languageCode VARCHAR(10) NOT NULL, -- en-us / es-mx
    languageName VARCHAR(50) NOT NULL,
    
    PRIMARY KEY (idLanguage)
);

CREATE TABLE IF NOT EXISTS Gender(
	idGender INT NOT NULL auto_increment,
    genderName VARCHAR(255),
    
    PRIMARY KEY (idGender)
);

CREATE TABLE IF NOT EXISTS GenderTranslation(
	idTranslation INT NOT NULL auto_increment,
    idGender INT NOT NULL,
    idLanguage INT NOT NULL,
    translate VARCHAR(50),
    
    PRIMARY KEY (idTranslation),
    FOREIGN KEY (idGender) REFERENCES Gender(idGender),
    FOREIGN KEY (idLanguage) REFERENCES Languages(idLanguage)
);

CREATE TABLE IF NOT EXISTS Episodes(
	idEpisode INT NOT NULL auto_increment,
	animeId INT NOT NULL,
    episodeNumber INT NOT NULL,
    episodeLength VARCHAR(10),
    episodeCoverUrl VARCHAR(255),
    episodeLanguageId INT NOT NULL,
    
    PRIMARY KEY (idEpisode),
    FOREIGN KEY (animeId) REFERENCES Anime(idAnime),
    FOREIGN KEY (episodeLanguageId) REFERENCES AnimeLanguage(idLanguage)
);

SELECT * FROM ANIME;
INSERT INTO Anime(
	animeName,
	animeTypeId,
    coverUrl,
    splashArtUrl,
    animeDescription,
    publishDate,
    likes,
    creators) VALUES ( "Kimetsu no Yaiba", 1, "asdasd", "asdasd", "Hello hello", "2021/09/11", 0, "a" )
