const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { listClients, startTimer, myIp } = require('./findservers.js');
const { listReceivers } = require('../cast')
const { playMovie } = require('../cast')
const ip = require('ip')
const PORT = 80

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, '../','/movies')))

app.get('/isserver', (req, res, next) => {
  res.status(200).send('connected')
})

app.get('/api/clients', (req, res, next) => {
  res.status(200).json({ clients: listClients() })
})

app.get('/api/castreceivers', (req, res, next) => {
  res.status(200).json({ castReceivers: listReceivers() })
})

app.put('/api/cast', (req, res, next) => {
  const url = req.body.url
  const name = req.body.name
  playMovie(url, name)
  res.status(200).send('Playing movie...')
})

app.get('/api/ip', (req, res, next) => {
  res.status(200).json({ ip: ip.address() })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
  console.log('Serving files from: ' + path.join(__dirname, '../','/movies'))
})

startTimer()

