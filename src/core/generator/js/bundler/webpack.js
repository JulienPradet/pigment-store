import path from 'path'
import Rx from 'rx'
import webpack from 'webpack'
import webpackConfig from './webpack.config.dev.js'
import paths from './paths'
import {saveFiles} from '../../../util/fs'
import logger from '../../util/log'

const log = logger('BUILD')

const appIndexJs = (styleguideDir) => path.join(styleguideDir, '/.index.js')

const bundler = (testDir, styleguideDir, {dev}) => (stream) => {
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
          log.message('success', 'You app was compiled successfully. Hooray!')
          messages.assets.map(({name, size}) => {
            log.message('info', `${name}: ${parseInt(size / 1000, 10)}M`)
          })
        }
      })

      if (dev) {
        compiler.watch({}, function (err, stats) {
          if (err) return observer.onNext({type: 'error', value: err})
        })
      } else {
        compiler.run(function (err, stats) {
          if (err) return observer.onNext({type: 'error', value: err})
          return observer.onNext({type: 'success'})
        })
      }
    })
  }

  const indexFile$ = saveFiles(
    Rx.Observable.just(stream.toString())
      .map((file) => ({
        file,
        filepath: path.join(styleguideDir, '.index.js')
      }))
  )

  return indexFile$
    .flatMap((filepath) => observeWebpack(createCompiler()))
    .map(() => appIndexJs(styleguideDir))
}

export default bundler
