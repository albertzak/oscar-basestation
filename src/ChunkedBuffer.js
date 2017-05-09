const EventEmitter = require('events')

const BUFFER_SIZE_BYTES = 100

class ChunkedBuffer extends EventEmitter {
  constructor (chunkTerminator = '\n') {
    super()

    this.buffer = Buffer.alloc(BUFFER_SIZE_BYTES)
    this.currentPosition = 0
    this.chunkTerminator = chunkTerminator
  }

  emitChunk () {
    const chunk = Buffer.alloc(this.currentPosition)
    this.buffer.copy(chunk, 0, 0, this.currentPosition)

    this.emit('chunk', chunk)
    this.currentPosition = 0
  }

  write (data) {
    data.copy(this.buffer, this.currentPosition, 0, data.length)
    // console.log(`[Buffer] Write ${data.length} bytes: ${data} to pos ${this.currentPosition}`)
    this.currentPosition += data.length

    if (this.currentPosition > 2 && data.includes(this.chunkTerminator)) {
      this.emitChunk()
    }

    this.emit('data', data)
  }
}

module.exports = { ChunkedBuffer }
