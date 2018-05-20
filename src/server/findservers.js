const http = require('http')
const ip = require('ip')
const LAN = require('./LAN')
const PORT = 5000

let allDevices = []
let myIp = ip.address()

const listClients = () => {
  return allDevices
}

const findServers = () => {
  for(let i = 1; i < 255; i++) {
    let newIp = LAN + i
    let data = ''
    http.get({ hostname: newIp, port: PORT, path: '/isserver'}, (res) => {
      res.on('data', (chunk) => {
        data = chunk.toString()
      })
      res.on('end', () => {
        if(data.length < 20) {
          if(data === 'connected' &&
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
  
  //List found devices every 3 seconds
  // setInterval(() => {
  //   console.log(listDevices())
  // }, 3000)
}

console.log(`My ip is ${myIp}`)
module.exports = {listClients, startTimer, myIp, PORT}