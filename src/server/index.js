const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { listClients, startTimer, myIp, PORT } = require('./findservers.js');
const { listReceivers, playMovie, control } = require('../cast')
const ip = require('ip')
const { db } = require('../data/dataStore')
const settingsStore = require('../Filereader')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(path.resolve(settingsStore.get('movieFilePath'))))
app.use(express.static(path.join(__dirname, '../', '/images')))
app.use(express.static(path.join(__dirname, '../', '/data/moviePosters')))

app.get('/isserver', (req, res, next) => {
  res.status(200).send('connected')
})

app.get('/api/settings/filePath', (req, res, next) => {
  let filePath = settingsStore.get('movieFilePath')
  res.status(200).json({ filePath })
})

app.put('/api/settings/filePath', (req, res, next) => {
  const path = req.body.path
  app.use(express.static(path))  
  settingsStore.set('movieFilePath', path)
  
  res.status(200).json({ msg: 'Folder selected.' })
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
      if(err) res.status(200).json({ movies: [] })
      else res.status(200).json({ movies: data })
    })
  } catch (error) {
    res.status(200).json({ movies: [] })
  }
})

app.use((error, req, res, next) => {
  console.log(error)
  res.status(500).json({ msg: 'Ooops, something went wrong!'})
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
  console.log('Serving files from:', path.resolve(settingsStore.get('movieFilePath')))
})

startTimer()

