const fetch = require('node-fetch');
const cheerio = require('cheerio')
const AnimeService = require('../services/anime.service')

class ScrappingAnime {

    constructor() {
        this.baseUrlSearch = "https://jkanime.net/ajax/ajax_search?q="
    }
    
    async searchAnime(animeName, command) {
        let alternaTitle = ""
        console.log(animeName)
        const url = this.baseUrlSearch + animeName

        let response = await fetch(url)
        let data = await response.json()

        try {
            alternaTitle = data["animes"][0]["altertitles"][0]["title"]
        }
        catch {
            alternaTitle = ""
        }
        
        if(data) {
            console.log(`DEBUG DATA`, data["animes"][0])
            let animeRegisterData = {
                animeName : data["animes"][0].title,
                animeTypeId : 1,
                coverUrl : data["animes"][0].image,
                splashArtUrl : data["animes"][0].thumbnail,
                animeDescription : data["animes"][0].synopsis,
                publishDate : data["animes"][0].startdate || data["animes"][0].timestamp,
                alternaTitle : alternaTitle,
                likes : 0,
                creators : 'No information'
            }

            console.log(animeRegisterData)

            if(command == 'register') { // will register the data into the database
                let service = new AnimeService()

                let responseRegister = service.saveAnime(animeRegisterData)

                return { action : command, register : responseRegister, anime : animeRegisterData }
            }
            else {
                return { action : command, anime : animeRegisterData }
            }
            
        }
        else {
            console.log("Anime not found")
            return "Error anime not found"
        }
    }

    async getChapters(id, offset) {
        const baseUrl = `https://jkanime.net/ajax/pagination_episodes/${id}/${offset}/`
        const data = await axios.get(baseUrl)
        if(data)
            return data.data
        else
            return { 'errror' : 'Not found' }
    }
}


module.exports = ScrappingAnime