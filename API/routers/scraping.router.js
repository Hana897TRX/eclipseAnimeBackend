const express = require('express');
const AnimeService = require('../services/scrapingAnime.service');
const router = express.Router();

const service = new AnimeService()

router.get('/', (req, res) => {
    res.send('welcome to scraping service')
})

router.post('/flv', async (req, res) => {
    const url = req.body.url
    if(url) {
        console.log('getting data')
        const data = await service.searchAnime(url)
    }
    else {
        res.json({
            error : 'Url found'
        })
    }
})

router.post('/jkSearchAnime', async(req, res) => {
    const keyboard = req.body.keyboard
    const baseUrl = "https://jkanime.net/ajax/ajax_search/?q="

})

router.post('/jkSearchAnimeInfo', async(req, res) => {
    const animeName = req.body.animeName
    const baseUrl = "https://jkanime.net/ajax/ajax_search/?q="
})

router.get('/jkSearchEpisodes/:id', async(req, res) => {
    const id = req.params.id
    console.log(id)
    let offset = req.body.offset || 1
    console.log(offset)
    
    const data = await service.getChapters(id, offset)
    
    if(data){
        res.json({
            'id' : id,
            data : data
        })
    }
    else {
        res.json({
            'id' : id,
            error : 'Info not found'
        })
    }
})

router.post('/jkSearchEpisodesUpload/:id', async(req, res) => {
    const id = req.params.id
    let offset = req.body.offset || 1
    const data = await service.getChapters(id, offset)

    const animeService = require('../services/anime.service')
    
})

module.exports = router