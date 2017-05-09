const dgram = require('dgram')

const broadcastAddress = '255.255.255.255'
const broadcastPort = 5555

class Broadcaster {
  async open () {
    return new Promise((resolve, reject) => {
      this.socket = dgram.createSocket('udp4')
      this.socket.bind(broadcastPort, '0.0.0.0', () => {
        this.socket.setBroadcast(true)

        resolve(null, this.socket)
      })
    })
  }

  async broadcast (message) {
    return new Promise((resolve, reject) => {
      this.socket.send(message, broadcastPort, broadcastAddress, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
}

module.exports = { Broadcaster }
