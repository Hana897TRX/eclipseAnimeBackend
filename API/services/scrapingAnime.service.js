const fetch = require('node-fetch');
const cheerio = require('cheerio')
const { hostname } = require('os')

class ScrappingAnime {

    constructor() {
        this.baseUrlSearch = "https://jkanime.net/ajax/ajax_search?q="
    }
    
    async searchAnime(animeName) {
        console.log(animeName)
        const url = this.baseUrlSearch + animeName

        let response = await fetch(url)
        let data = await response.json()

        if(data) {
            console.log(data["animes"][0])
            return data["animes"][0]
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