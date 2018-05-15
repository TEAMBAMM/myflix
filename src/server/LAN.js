const ip = require('ip')

const findLAN = () => {
  const myIp = ip.address()
  for(let i = myIp.length - 1; i > 0; i--) {
    if (myIp[i] === '.') {
      return myIp.slice(0, i + 1)
    }
  }
}

module.exports = findLAN()
