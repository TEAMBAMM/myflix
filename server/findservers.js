const LAN = require('./LAN.js');
const http = require('http')
const ip = require('ip')
console.log('running server finder')

let allDevices = []

const listDevices = () => {
  return allDevices
}

const findServers = () => {
  for(let i = 10; i < 15; i++) {
    let newIp = LAN + i
    let data
    const options = { hostname: newIp, port: 80, path: '/isserver'}
    http.get({ hostname: newIp, port: 80, path: '/isserver'}, (res) => {
      res.on('data', (chunk) => {
        data = chunk
      })
      res.on('end', () => {
        if(JSON.parse(data).msg.trim() === 'connected' &&
        newIp !== ip.address() &&
        allDevices.indexOf(newIp) === -1
        ) allDevices.push(newIp)
      })
    }).on("error", (err) => {
      allDevices = allDevices.filter(ip => ip !== err.address)
    })
  }
}

setInterval(() => {
  findServers()
}, 5000)

module.exports = listDevices