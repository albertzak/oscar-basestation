const SerialPort = require('serialport')
const EventEmitter = require('events')

class USB extends EventEmitter {
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

  async open () {
    try {
      await this._open()
    } catch (e) {
      console.log('[Serial] Could not open port, retrying')
      this.kill()
    }
  }

  async _open () {
    const port = await this.findPort()
    console.log('[Serial] Attempting to open port', port)
    this.serial = new SerialPort(port, { lock: false })
    this.serial.on('open', () => {
      console.log('[Serial] Opened, setting up event listeners')
      this.setupListeners()
    })
  }

  kill () {
    console.log('[Serial] Killing serial. Retrying in 0.5s.')
    if (this.serial) {
      this.serial.removeAllListeners()
      this.serial.close((err) => {
        if (err) {
          console.log('[Serial] Could not close port.', err.message)
        }
        setTimeout(() => this.open(), 500)
      })
    } else {
      setTimeout(() => this.open(), 500)
    }
  }

  setupListeners () {
    this.serial.on('data', (data) => {
      this.emit('data', data)
    })

    this.serial.on('error', (error) => {
      console.log(`[Serial] Error: ${error}`)
      this.kill()
    })

    this.serial.on('disconnect', () => {
      console.log('[Serial] Serial port was disconnected')
      this.kill()
    })

    this.serial.on('close', () => {
      console.log('[Serial] Serial port was closed')
      this.kill()
    })
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
