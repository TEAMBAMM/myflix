const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const PORT = 9000
require('./findservers.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, '../','/movies')))

app.get('/isserver', (req, res, next) => {
  res.status(200).json({ msg: 'connected' })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
  console.log('Serving files from: ' + path.join(__dirname, '../','/movies'))
})
