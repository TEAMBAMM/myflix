const chromecasts = require('chromecasts')
const Path = require('path')
const list = chromecasts()
const ip = require('ip')

const allPlayers = []
let currentPlayer
let currentStatus

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
  currentPlayer = allPlayers[0]
  currentPlayer.on('status', status => {
    currentStatus = status
  })
  currentPlayer.play(url, {title: name, type: 'video/mp4'})
}

const listReceivers = () => {
  return allPlayers
}

const updatePlayers = () => {
  list.update()
}

const seek = seconds => {
  currentPlayer.status((err, status) => {
    currentPlayer.seek(currentStatus.currentTime + seconds)
  })
}

const control = command => {
  switch(command) {
  case 'play':
    return currentPlayer.resume()
  case 'pause':
    return currentPlayer.pause()
  case 'stop':
    return currentPlayer.stop()
  case 'rewind':
    return seek(-180)
  case 'forward':
    return seek(180)
  default:
    return
  }
}

setInterval(()=>{
  updatePlayers()
}, 3000)

// setInterval(()=>{
//   console.log('All Players: ', allPlayers)
// }, 2000)

module.exports = { 
  control,
  updatePlayers, 
  playMovie, 
  listReceivers 
}