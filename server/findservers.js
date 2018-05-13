const dgram = require('dgram')
const ip = require('ip')
const LAN = require('./LAN')
const server = dgram.createSocket('udp4')
console.log('here')

let allClients = new Map()
let myIp = ip.address()
let broadcastAddress = LAN + '255'

server.bind(2442)

server.on('message', (msg, rinfo) => {
  allClients
  console.log('Message: ', msg.toString())
})

server.on('listening', () => {
  console.log('Listening on: ', server.address())
})

const broadcast = () => {
  server.send(Buffer.from(myIp), 2442, broadcastAddress)
}

const listClients = () => {
  return allClients
}

setInterval(() => {
  broadcast()
}, 2000)

console.log(`My ip is ${myIp}`)
module.exports = { listClients, myIp }