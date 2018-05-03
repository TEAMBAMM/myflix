const express = require('express')
const path = require('path')
const app = express()
const PORT = 9000

app.use(express.static(path.join(__dirname, '../','/movies')))

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
  console.log('Serving files from: ' + path.join(__dirname, '../','/movies'))
})