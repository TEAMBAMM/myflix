const chromecasts = require('chromecasts')
const Path = require('path')
const list = chromecasts()
const ip = require('ip')

const allPlayers = []

list.on('update', player => {
  if(player.host.length < 13 && allPlayers.length === 0) {
    return allPlayers.push(player)
  } else if(player.host.length < 13) {
    allPlayers.forEach(singlePlayer => {
      if(singlePlayer.name === player.name) return
    })
  }
  if(player.host.length < 13) return allPlayers.push(player)
})

const playMovie = (url, name, device) => {
  console.log('Playing: ', url)
  allPlayers[0].play(url, {title: name, type: 'video/mp4'})
}

const listReceivers = () => {
  return allPlayers
}

const updatePlayers = () => {
  list.update()
}

setInterval(()=>{
  updatePlayers()
}, 3000)

setInterval(()=>{
  console.log(allPlayers)
}, 2000)

module.exports = { updatePlayers, playMovie, listReceivers }