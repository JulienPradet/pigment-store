import express from 'express'
import path from 'path'
import {Subject} from 'rx'
import logger from '../../../util/log'

const log = logger('BUILD')

const getConfig = (testDir) => {
  let config
  try {
    config = require(path.join(testDir, '.config.server'))
  } catch (ex) {
    config = {}
  }
  return config
}

const serve = (testDir, styleguideDir, {host = 'localhost', port = 3000}) => (compiledFile$) => {
  let compiledFile = null
  const config = getConfig(testDir)
  const app = express()
  app.get('/favicon.ico', function (req, res) {})

  if (config.public) {
    app.use('/public', express.static(config.public))
  }

  app.use('/app.js', (req, res) => {
    if (compiledFile) {
      res.send(compiledFile)
    } else {
      res.send(`console.log('Compiling...')`)
    }
  })

  app.use('/', express.static(styleguideDir))

  const webServer = app.listen(port, host, function () {
    var host = webServer.address().address
    var port = webServer.address().port

    log.message('debug', `Starting dev server at http://${host}:${port}`)
  })

  const server$ = new Subject()

  compiledFile$.subscribe(
    (file) => {
      compiledFile = file
    },
    () => {},
    () => {
      server$.onNext()
      server$.onCompleted()
    }
  )

  return server$
}

export default serve
