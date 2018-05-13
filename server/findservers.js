const dgram = require('dgram')
const ip = require('ip')
const LAN = require('./LAN')
const server = dgram.createSocket('udp4')

let allClients = new Map()
let myIp = ip.address()
let broadcastAddress = LAN + '255'

server.bind(2442, LAN + '255', () => {
  server.setBroadcast(true)
})

server.on('message', (msg, rinfo) => {
  msg = msg.toString()
  allClients.set(msg, 2) 
})

server.on('listening', () => {
  console.log('Listening on: ', server.address())
})

const verifyClients = () => {
  const decrementValue = (value, key, map) => {
    map.set(key, value - 1)
  }
  allClients.forEach(decrementValue)
}

const broadcast = () => {
  server.send(Buffer.from(myIp), 2442, LAN + '255')
}

const listClients = () => {
  const deleteKey = (value, key, map) => {
    if(!value) {
      map.delete(key)
    }
  }
  allClients.forEach(deleteKey)
  return [...allClients.keys()]
}

setInterval(() => {
  broadcast()
  verifyClients()
  console.log(listClients())
}, 2000)

console.log(`My ip is ${myIp}`)
module.exports = { listClients, myIp }