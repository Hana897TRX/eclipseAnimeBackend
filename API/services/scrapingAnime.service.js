const axios = require('axios')
const cheerio = require('cheerio')

class ScrappingAnime {

    constructor() {
        
    }
    
    async searchAnime(url) {
        console.log(url)
        const pageData = await axios.get(url)
        if(pageData) {
            const $ = cheerio.load(pageData)
            console.log($.html())
        }
        else {
            console.log("Error")
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