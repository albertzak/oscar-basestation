const SerialPort = require('serialport')
const EventEmitter = require('events')

class USB extends EventEmitter {
  async open () {
    const port = await this.findPort()
    console.log('[Serial] Connecting to port', port)
    this.serial = new SerialPort(port)

    this.serial.on('data', (data) => {
      //console.log(`[Serial] Data: ${data}`)
      this.emit('data', data)
    })

    this.serial.on('error', (error) => {
      console.log(`[Serial] Error: ${error}`)
      this.emit('error', error)
    })

    this.serial.on('disconnect', () => {
      console.log('[Serial] Disconnect')
      this.emit('error', new Error('Serial port was disconnected'))
    })

    this.serial.on('close', () => {
      console.log('[Serial] Close')
      this.emit('error', new Error('Serial port was closed'))
    })
  }

  // Older Arduino models use an FTDI chip that shows
  // up as /dev/ttyUSB*, newer models use an Atmel chip
  // that creates /dev/ttyACM*
  isMatchingDevice (device) {
    return (
      device.manufacturer === 'FTDI' ||
      device.comName.includes('/dev/ttyUSB') ||
      device.comName.includes('/dev/ttyACM')
    )
  }

  // Scan for USB device
  // Returns a promise that resolves to the string of
  // the first matching '/dev/tty*' device port,
  // or rejects if no matching port was found
  findPort () {
    return new Promise((resolve, reject) => {
      SerialPort.list((err, results) => {
        console.log('[Serial] Available ports', results)
        if (err) {
          console.error('[Serial] Error listing ports', err)
          reject(err)
        } else {
          for (let i = 0; i < results.length; i++) {
            if (this.isMatchingDevice(results[i])) {
              resolve(results[i].comName)
              break
            }
          }
          reject(new Error('Could not find matching device'))
        }
      })
    })
  }
}

module.exports = { USB }
