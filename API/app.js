const express = require('express')
const app = express()
const port = 3000
const routerApi = require('./routers')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('EclipseAPI Working')
})

routerApi(app)

app.listen(port, () => {
    console.log('EclipseAPI Working ' + port)
})