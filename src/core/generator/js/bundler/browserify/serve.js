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

const serve = (testDir, styleguideDir, {host = 'localhost', port = 3000}) => (compiledAppFile$, compiledIframeFile$) => {
  let compiledAppFile = null
  let compiledIframeFile = null
  const config = getConfig(testDir)
  const app = express()
  app.get('/favicon.ico', function (req, res) {})

  if (config.public) {
    app.use('/public', express.static(config.public))
  }

  app.use('/app.js', (req, res) => {
    if (compiledAppFile) {
      res.send(compiledAppFile)
    } else {
      res.send(`console.log('Compiling the app...')`)
    }
  })

  app.use('/iframe.js', (req, res) => {
    if (compiledIframeFile) {
      res.send(compiledIframeFile)
    } else {
      res.send(`console.log('Compiling the iframe...')`)
    }
  })

  app.use('/', express.static(styleguideDir))

  const webServer = app.listen(port, host, function () {
    var host = webServer.address().address
    var port = webServer.address().port

    log.message('debug', `Starting dev server at http://${host}:${port}`)
  })

  const server$ = new Subject()

  compiledAppFile$.subscribe(
    (file) => {
      compiledAppFile = file
    },
    () => {},
    () => {
      server$.onNext()
      server$.onCompleted()
    }
  )

  compiledIframeFile$.subscribe(
    (file) => {
      compiledIframeFile = file
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
