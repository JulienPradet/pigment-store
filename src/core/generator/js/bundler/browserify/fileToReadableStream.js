const Readable = require('stream').Readable

const fileToReadableStream = (file) => {
  const fileStream = new Readable()
  fileStream.push(file)
  fileStream.push(null)
  return fileStream
}

module.exports = fileToReadableStream
