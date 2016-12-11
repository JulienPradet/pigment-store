const path = require('path')
const Observable = require('rx').Observable
const WebpackDevServer = require('webpack-dev-server')
const logger = require('../../../util/log')

const log = logger('BUILD')

const serve = (testDir, styleguideDir, { host = 'localhost', port = 3000 }) => (compiler) => {
  return Observable.create((observer) => {
    const server = new WebpackDevServer(compiler, {
      compress: true,
      hot: true,
      contentBase: path.resolve(process.cwd(), styleguideDir),
      quiet: true,
      host: host
    })

    server.listen(port, (err, result) => {
      if (err) {
        log.message('error', err)
        observer.onNext({type: 'error', value: err})
        observer.onCompleted()
      }

      log.message('debug', `Starting dev server at http://${host}:${port}`)
    })
  })
}

module.exports = serve
