const { createSocket, broadcast } = require('./broadcasting')

const main = () => {
  createSocket((err, socket) => {
    if (err) {
      console.error(err)
    }

    setInterval(() => {
      console.log('Hello World 🦄')
      broadcast(socket, '123,456,789,10,11,12')
    }, 1000)
  })
}

module.exports = { main }
