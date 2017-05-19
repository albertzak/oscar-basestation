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
var i = 0;
    setInterval(() => {
      
      socket.broadcast(i)
      if (i ==200) {
        i = 0;
      }
    }, 1000)
  } catch (e) {
    console.log('xxx', e)
  }
}

module.exports = { main }
