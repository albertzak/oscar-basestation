const dgram = require('dgram')

const broadcastAddress = '255.255.255.255'
const broadcastPort = 5555

const createSocket = (callback) => {
  const socket = dgram.createSocket('udp4')
  socket.setBroadcast(true)
  socket.bind(broadcastPort, '0.0.0.0', () => {
    callback(null, socket)
  })
}

const broadcast = (socket, message) => {
  socket.send(message, broadcastPort, broadcastAddress, (err) => {
    if (err) {
      console.error(err)
    }
  })
}

module.exports = { createSocket, broadcast }
