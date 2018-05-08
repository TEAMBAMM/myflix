const chromecasts = require('chromecasts')
const Path = require('path')
const list = chromecasts()
const ip = require('ip')

// const url = 'http://rarbg.to/download.php?id=w7gbrh3&f=Black.Panther.2018.720p.BluRay.H264.AAC-RARBG-[rarbg.to].torrent'
const url = `http://${ip.address()}/12.mkv`
// const url = 'http://192.168.1.5/bb.mp4'
console.log(url)

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
  console.log(url)
  allPlayers[0].play(url, {title: name, type: 'video/mp4'})
}


const updatePlayers = () => {
  list.update()
}

setInterval(()=>{
  updatePlayers()
}, 3000)

// setTimeout(()=>{
//   playMovie(url, '12 Strong', allPlayers[0])
// }, 2000)

module.exports = { updatePlayers, playMovie }