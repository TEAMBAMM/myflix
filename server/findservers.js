const LAN = require('./LAN.js')
const http = require('http')

console.log(LAN)
const allDevices = []

const options = {
  host: '192.168.1.12',
  port: 9000,
  method: 'GET',
  path: '/isserver'
}

const postData = {
  'msg': 'Hello World!'
};

setTimeout(() => {
  console.log('here')
  
  http.get({ hostname: '192.168.1.12', port: 9000, path: '/isserver'}, (res) => {
    let data
    res.on('data', (chunk) => {
      data = chunk
    });
    res.on('end', () => {
      console.log(data);
    });
  })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
}, 1000)
