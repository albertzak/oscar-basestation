const { broadcast } = require('./broadcasting')

const main = () => {
  setInterval(() => {
    console.log('Hello World 🦄')
    broadcast()
  }, 1000)
}

module.exports = { main }
