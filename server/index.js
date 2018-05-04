const express = require('express')
const path = require('path')
const app = express()
const morgan = require('morgan')
const PORT = 9000

app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, '../','/movies')))

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
  console.log('Serving files from: ' + path.join(__dirname, '../','/movies'))
})