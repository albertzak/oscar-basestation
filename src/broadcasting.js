const dgram = require('dgram')
const broadcast = () => {
  const socket = dgram.createSocket('udp4', () => {
    const testMessage = '[hello world] pid: ' + process.pid
    const broadcastAddress = '192.168.243.93'
    const broadcastPort = 5555

    socket.setBroadcast(true)
    socket.bind(broadcastPort, '0.0.0.0')

    socket.on('message', function (data, rinfo) {
      console.log('Message received from ', rinfo.address, ' : ', data.toString())
    })

    setInterval(function () {
      socket.send(new Buffer(testMessage),
        0,
        testMessage.length,
          broadcastPort,
          broadcastAddress,
          function (err) {
            if (err) console.log(err)

            console.log('Message sent')
          }
        )
    }, 1000)
  })
}

module.exports = { broadcast }
