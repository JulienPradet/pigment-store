import path from 'path'
import Rx from 'rx'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackConfig from './webpack.config.dev.js'
import paths from './paths'
import {saveFiles} from '../../../util/fs'
import logger from '../../util/log'

const log = logger('BUILD')

const appIndexJs = (styleguideDir) => path.join(styleguideDir, '/.index.js')

const bundler = (testDir, styleguideDir, {dev, host = 'localhost', port = 3000}) => (baseIndexFile$) => {
  const createCompiler = () => {
    const config = webpackConfig({
      env: {NODE_ENV: dev ? 'development' : 'production'},
      paths: paths(testDir, styleguideDir)
    })

    return webpack(config)
  }

  const observeWebpack = (compiler) => {
    return Rx.Observable.create((observer) => {
      compiler.plugin('invalid', function () {
        log.message('info', 'Compiling...')
      })

      compiler.plugin('done', function (stats) {
        const messages = stats.toJson({}, true)

        if (messages.errors.length > 0) {
          messages.errors.forEach((message) => {
            log.message('error', message)
          })
        }

        if (messages.warnings.length > 0) {
          messages.warnings.forEach((message) => {
            log.message('warn', message)
          })
        }

        if (messages.warnings.length === 0 && messages.errors.length === 0) {
          log.message('success', 'Your app was compiled successfully. Hooray!')
        }
      })

      if (dev) {
        const server = new WebpackDevServer(compiler, {
          compress: true,
          hot: true,
          contentBase: path.join(process.cwd(), styleguideDir),
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
      } else {
        log.message('info', 'Compiling...')
        compiler.run(function (err, stats) {
          if (err) {
            observer.onNext({type: 'error', value: err})
          } else {
            observer.onNext({type: 'success'})
          }
          observer.onCompleted()
        })
      }
    })
  }

  const indexFile$ = saveFiles(
    baseIndexFile$.map((file) => ({
      file: file.toString(),
      filepath: path.join(styleguideDir, '.index.js')
    }))
  )

  return indexFile$
    .flatMap((filepath) => observeWebpack(createCompiler()))
    .map(() => appIndexJs(styleguideDir))
}

export default bundler
