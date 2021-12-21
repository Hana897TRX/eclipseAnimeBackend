const express = require('express')

const scraping = require('./scraping.router')
const anime = require('./anime.router')

function routerApi(app) {
    const scrapRouter = express.Router()
    const animeRouter = express.Router()
    
    app.use('/scrap/v1', scrapRouter)

    app.use('/api/v1/', animeRouter)

    animeRouter.use('/', anime)
    scrapRouter.use('/', scraping)
}

module.exports = routerApi