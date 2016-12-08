import path from 'path'
import {Observable} from 'rx'
import WebpackDevServer from 'webpack-dev-server'
import logger from '../../../util/log'

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

export default serve
