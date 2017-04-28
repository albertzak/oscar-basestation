const Serialport = require('serialport')

const portName = process.env.XBEE_SERIAL_PORT || '/dev/ttyS0'  // This is the standard Raspberry Pi Serial port

const serial = (onData) => {
  const sp = new Serialport(portName, {
    baudRate: 9600,
    parity: 'none',
    stopBits: 1,
    flowControl: false
  })

  console.log('Opening seriaport', portName)

  sp.on('open', () => {
    console.log('Opened seriaport', portName)

    sp.on('data', (data) => {
      console.log('Serial data received: ' + data)
      onData(null, data)
    })
  })
}

module.exports = { serial }
