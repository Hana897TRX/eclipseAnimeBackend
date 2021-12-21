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

module.exports = router