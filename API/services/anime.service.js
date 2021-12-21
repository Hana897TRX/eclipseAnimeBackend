const mongoose = require('mongoose');
const Anime = require('./../models/Anime')

class AnimeService {

    constructor() {
        this.connection = mongoose.connect('mongodb+srv://Hana897TRX:MThelegend1-@eclipseanime.ijyab.mongodb.net/EclipseAnimeDataBase?retryWrites=true&w=majority');
    }

    getTop10Anime() {
        const top10Anime = ```
        SELECT *
        ```
    }

    async saveAnime(animeData) {
        console.error("RUNNING")
        let animeRegister = new Anime({
            animeName : animeData.animeName,
            animeTypeId : 1,
            coverUrl : animeData.coverUrl,
            splashArtUrl : animeData.splashArtUrl,
            animeDescription : animeData.animeDescription,
            publishDate : animeData.publishDate || Date.now(),
            status : "finished",
            likes : 0,
            creators : "No data"
        })

        console.log(animeRegister)

        animeRegister.save((error, anime) => {
            if(error) return console.error(error)
            console.log(anime.animeName + "Anime saved")
        })

        console.log(response)
    }

    async searchAnimeId(animeName) {
        const query = `
            SELECT idAnime 
            FROM Anime 
            WHERE animeName LIKE ?
        `
        this.connection.query(query, [animeName], (error, results, fields) => {
            if(error) 
                return { 'error' : 'Anime not found' }
            else {
                return { 
                    'id' : results,
                    'data' : fields
                }
            }
        })
    }

    async saveChapterData(animeId, chapterData) {
        const data = JSON.parse(chapterData)

        const saveAnimeData = 
        `INSERT INTO Episodes (
            animeId, 
            episodeNumber, 
            episodeLength, 
            episodeCoverUrl, 
            episodeLanguageId
            ) VALUES (?, ?, ?, ?, ?)
        `

        for(let i = 0; i < data.length; i++) {
            this.connection.query(saveAnimeData, [animeId, chapterData[i].number, "24.0m", 'na', 1], (error, results, fields) => {
                if(error)
                    return { 'error' : 'Error while inserting data' }
                else
                    return { 'success' : results, 'fields' : fields }
            })
        }
    }
}

module.exports = AnimeService