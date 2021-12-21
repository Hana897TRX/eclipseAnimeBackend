const response = require('express')
const mysql = require('mysql')

class AnimeService {

    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user : 'root',
            password : 'root',
            database : 'eclipseanime'
        })

        this.connection.connect()
    }

    getTop10Anime() {
        const top10Anime = ```
        SELECT *
        ```
    }

    async saveAnime(animeData) {
        console.table(animeData)
        const query = `INSERT INTO Anime (animeName, animeTypeId, coverUrl, splashArtUrl, animeDescription,publishDate, likes, creators) VALUES ('${animeData.animeName}',${animeData.animeTypeId},'${animeData.coverUrl}','${animeData.splashArtUrl}','${animeData.animeDescription}', '2021-01-01',${animeData.likes},'${animeData.creators}')`
        console.log(query)
        this.connection.query(query,(error, results, fields) => {
                console.table(error, results)
                if(error) 
                    return { 'error' : error }
                else 
                    return { 'results' : results }
            }
        )
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