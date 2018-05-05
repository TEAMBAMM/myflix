const http = require('http')
const ip = require('ip')
const LAN = require('./LAN')

let allDevices = []
let myIp = ip.address()

const listDevices = () => {
  return allDevices
}

//Sending get request to router at 192.168.1.1 crashes application
//Can't parse data sent back from router
const findServers = () => {
  for(let i = 0; i < 255; i++) {
    let newIp = LAN + i
    let data = null
    http.get({ hostname: newIp, port: 80, path: '/isserver'}, (res) => {
      res.on('data', (chunk) => {
        data = chunk
      })
      res.on('end', () => {
        if(data.length < 20) {
          if(JSON.parse(data).msg.trim() === 'connected' &&
          newIp !== myIp &&
          allDevices.indexOf(newIp) === -1
          ) allDevices.push(newIp)        
        }
      })
    }).on("error", (err) => {
      allDevices = allDevices.filter(ip => ip !== err.address)
    })
  }
}

const startTimer = () => {
  console.log('Timer Started For Server Finder!')
  setInterval(() => {
    findServers()
  }, 5000)
  
  setInterval(() => {
    console.log(listDevices())
  }, 3000)
}


console.log(`My ip is ${myIp}`)
module.exports = {listDevices, startTimer, myIp}