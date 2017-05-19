const { USB } = require('./USB')
const { ChunkedBuffer } = require('./ChunkedBuffer')
const { Broadcaster } = require('./Broadcaster')

const main = async () => {
  const usb = new USB()
  const buffer = new ChunkedBuffer()
  const socket = new Broadcaster()

  await usb.open()
  await socket.open()

  usb.on('data', (data) => {
    buffer.write(data)
  })

  buffer.on('chunk', (chunk) => {
    console.log(`[Main] Broadcasting "${chunk}"`)
    socket.broadcast(chunk)
  })

  setInterval(() => {
    console.log('[Main] Broadcasting ping')
    socket.broadcast('ping')
  }, 1000)

  setInterval(()=> {
	socket.broadcast(data)
  },100)

}

module.exports = { main }
