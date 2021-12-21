const express = require('express')
const app = express()
const port = 5000
const routerApi = require('./routers')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('EclipseAPI Working')
})

routerApi(app)

app.listen(port, () => {
    console.log('EclipseAPI Working ' + port)
})