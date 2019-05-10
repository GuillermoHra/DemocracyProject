// TODO:
// 1 - send only relevant information
// 2 - personalize error messages

const express = require('express')
require('./db/mongoose')
var cors = require('cors');

const app = express()
const port = process.env.PORT || 3000

const router = require('./routes')

app.use(express.json()) // parses to json
app.use(router)
app.use(cors())

app.listen(port, function() {
    console.log('Server up and running on port ' + port)
})
