const { USB } = require('./USB')
const { ChunkedBuffer } = require('./ChunkedBuffer')
const { Broadcaster } = require('./Broadcaster')

const main = async () => {
  try {
    const usb = new USB()
    const buffer = new ChunkedBuffer()
    const socket = new Broadcaster()

    await usb.open()
    await socket.open()

    usb.on('data', (data) => {
      buffer.write(data)
    })

    buffer.on('chunk', (chunk) => {
      socket.broadcast(chunk)
    })

    setInterval(() => {
      socket.broadcast('ping')
    }, 1000)
  } catch (e) {
    console.log('xxx', e)
  }
}

module.exports = { main }
