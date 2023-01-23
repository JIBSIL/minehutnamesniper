const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const port = 3000

app.get('/', (req, res) => {
    res.send('You\'ve reached the MinehutNameSniper public endpoint :) Private endpoints require a sign-in with an API key. Use a POST request to use the API via terminal.')
})

app.post('/', (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

app.listen(port, () => {
    console.log(`App started on port ${port}`)
})