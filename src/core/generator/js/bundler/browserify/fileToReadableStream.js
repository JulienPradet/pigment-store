import {Readable} from 'stream'

const fileToReadableStream = (file) => {
  const fileStream = new Readable()
  fileStream.push(file)
  fileStream.push(null)
  return fileStream
}

export default fileToReadableStream
