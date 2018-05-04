const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const {listDevices, startTimer, myIp} = require('./findservers.js');
const PORT = 80

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, '../','/movies')))

app.get('/isserver', (req, res, next) => {
  res.status(200).json({ msg: 'connected' })
})

app.get('/api/devices', (req, res, next) => {
  res.status(200).json({ devices: listDevices() })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
  console.log('Serving files from: ' + path.join(__dirname, '../','/movies'))
})

startTimer()

