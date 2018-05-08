const chromecasts = require('chromecasts')
const Path = require('path')
const list = chromecasts()

// const url = 'http://rarbg.to/download.php?id=w7gbrh3&f=Black.Panther.2018.720p.BluRay.H264.AAC-RARBG-[rarbg.to].torrent'
const url = 'http://192.168.1.5/den.mkv'
// const url = 'http://192.168.1.5/bb.mp4'
console.log(url)

const allPlayers = []

list.on('update', player => {
  if(allPlayers.length === 0) allPlayers.push(player)
  else {
    for(let i = 0; i < allPlayers.length; i++) {
      if(allPlayers[i].name === player.name) return 
    }
    allPlayers.push(player)
  }
})

const playMovie = (url, name)

const updatePlayers = () => {
  list.update()
}

setInterval(()=>{
  updatePlayers()
}, 500)

setTimeout(()=>{
  allPlayers[0].play(url, {title: 'my video', type: 'video/mp4'})
}, 5000)

module.exports = { updatePlayers }