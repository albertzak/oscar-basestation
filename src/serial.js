const Serialport = require('serialport')

const portName = process.env.XBEE_SERIAL_PORT || '/dev/ttyS0'  // This is the standard Raspberry Pi Serial port

const serial = (onData) => {
  const sp = new Serialport(portName, {
    baudRate: 9600,
    parity: 'none',
    stopBits: 1,
    flowControl: false
  })

  sp.on('open', () => {
    console.log('open')

    sp.on('data', (data) => {
      console.log('data received: ' + data)
      onData(null, data)
    })
  })
}

module.exports = { serial }
