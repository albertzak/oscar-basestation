const { createSocket, broadcast } = require('./broadcasting')
const { serial } = require('./serial')

const main = () => {
  createSocket((err, socket) => {
    if (err) {
      console.error(err)
    }
    serial((err, liveData) => {
      if (err) {
        console.log(err)
      }
      broadcast(socket, liveData)
    })

    setInterval(() => {
      console.log('Hello World 🦄')
      broadcast(socket, 'ping')
    }, 1000)
  })
}

module.exports = { main }
