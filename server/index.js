const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { listClients, startTimer, myIp } = require('./findservers.js');
const { listReceivers, playMovie, control } = require('../cast')
const ip = require('ip')
const { db } = require('../data/dataStore')
const PORT = 80

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, '../','/movies')))
app.use(express.static(path.join(__dirname, '../','/src/images')))
app.use(express.static(path.join(__dirname, '../','/data/moviePosters')))

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

app.put('/api/cast/:command', (req, res, next) => {
  const command = req.params.command
  control(command)
  res.status(200).send(command)
})

app.get('/api/ip', (req, res, next) => {
  res.status(200).json({ ip: ip.address() })
})

app.get('/api/movies', (req, res, next) => {
  try {
    db.find({}, (err, data) => {
      res.status(200).json({ movies: data })
    })
  } catch (error) {
    next(error)
  }
})

app.use((error, req, res, next) => {
  console.log(error)
  res.status(500).json({ msg: 'Ooops, something went wrong!'})
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
  console.log('Serving files from: ' + path.join(__dirname, '../','/movies'))
})

startTimer()

