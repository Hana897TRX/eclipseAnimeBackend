const express = require('express')
const AnimeService = require('../services/anime.service')
const router = express.Router()

const service = new AnimeService()

router.get('/top-10', async (req, res) => {
    
})

router.post('/anime', async (req, res) => {
    const data = req.body
    if(data) {
        const response = await service.saveAnime(data)

        if(response) {
            res.status(201).json({
                'message' : 'success',
                'data' : response
            })
        }
        else {
            res.status(500).json({
                'message' : 'error',
            })
        }
    }
    else {
        res.status(400).json({
            'message' : 'error no query data'
        })
    }
})

router.post('/saveEpisodes', async (req, res) => {
    const episodeData = {
        episodeNumber : req.body.episodeNumber,
        episodeLanguage : req.body.episodeLanguage,
        episodeUrl : req.body.episodeUrl,
        episodeImgPath : req.body.episodeImgPath,
        episodeDate : req.body.episodeDate || Date.now()
    }

    const animeName = req.body.animeName.toLowerCase()
    const response = await service.saveEpisode(episodeData, animeName)

    res.status(201).send(response)
})

router.get('/lastEpisodes', async (req, res) => {
    const response = await service.lastEpisodes()

    if(response) {
        res.status(201).json({
            'message' : 'success',
            'data' : response
        })
    }
    else {
        res.status(501).json({
            'error' : response
        })
    }
})

module.exports = router