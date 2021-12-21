DROP DATABASE IF EXISTS eclipseanime;
CREATE DATABASE IF NOT EXISTS EclipseAnime;
USE EclipseAnime;

-- USE ONLY FOR TESTING
SET FOREIGN_KEY_CHECKS=0;
SET FOREIGN_KEY_CHECKS=1;

DROP TABLE IF EXISTS AnimeTypes;
CREATE TABLE IF NOT EXISTS AnimeTypes(
	idType INT auto_increment,
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
    animeDescription TEXT NULL,
    publishDate DATE DEFAULT NULL,
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
    episodeCoverUrl VARCHAR(500),
    episodeLanguageId INT NOT NULL,
    
    PRIMARY KEY (idEpisode),
    FOREIGN KEY (animeId) REFERENCES Anime(idAnime),
    FOREIGN KEY (episodeLanguageId) REFERENCES Languages(idLanguage)
);

SELECT * FROM ANIME;

INSERT INTO AnimeTypes VALUES (0, "SERIE");
INSERT INTO AnimeTypes VALUES (0, "OVA");
INSERT INTO AnimeTypes VALUES (0, "MOVIE");

INSERT INTO Anime(
	animeName,
	animeTypeId,
    coverUrl,
    splashArtUrl,
    animeDescription,
    publishDate,
    likes,
    creators) VALUES ( "Kimetsu no Yaiba", 1, "asdasd", "asdasd", "Hello hello", null, 0, "a" );

INSERT INTO Anime (animeName, animeTypeId, coverUrl, splashArtUrl, animeDescription,publishDate, likes, creators) VALUES ('Citrus',1,'https://cdn.jkanime.net/assets/images/animes/image/citrus.jpg','https://cdn.jkanime.net/assets/images/animes/thumbnail/citrus.jpg','Yuzu es una chica alegre y activa que se traslada a la ciudad junto a su madre con la intención de echarse novio y vivir la vida en un nuevo instituto. Sin embargo, todos sus planes se verán frustrados y terminará asistiendo a un colegio sólo de chicas. Allí conocerá a Mei, la seria y fría Presidenta del Consejo de Estudiantes que además resulta ser su hermanastra. Yuzu y Mei tendrán que convivir juntas, aunque en el proceso puede que comiencen a despertar en ellas sentimientos prohibidos...',null,0,'No information')