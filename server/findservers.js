const LAN = require('./LAN.js')
const http = require('http')
const ip = require('ip')

const allDevices = []

setTimeout(() => {

  for(let i = 10; i < 255; i++) {
    let newIp = LAN + i
    http.get({ hostname: newIp, port: 9000, path: '/isserver'}, (res) => {
      let data
      res.on('data', (chunk) => {
        data = chunk
      });
      res.on('end', () => {
        if(JSON.parse(data).msg.trim() === 'connected' && newIp !== ip.address() ) allDevices.push(newIp)
      });
    })
      .on("error", (err) => {
      });
  }
}, 1000)

setTimeout(() => {
  console.log(allDevices)
}, 3000)
