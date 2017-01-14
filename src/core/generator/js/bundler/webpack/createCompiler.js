const paths = require('./paths')
const webpack = require('webpack')
const logger = require('../../../util/log')

const log = logger('BUILD')

const createCompiler = (sourceDir, testDir, styleguideDir, {dev}) => {
  const webpackConfig = dev
    ? require('./webpack.config.dev.js')
    : require('./webpack.config.prod.js')

  const config = webpackConfig({
    env: {NODE_ENV: dev ? 'development' : 'production'},
    paths: paths(sourceDir, testDir, styleguideDir)
  })

  const compiler = webpack(config)

  compiler.plugin('invalid', function () {
    log.message('info', 'Compiling...')
  })

  compiler.plugin('done', function (stats) {
    let failed = false
    const messages = stats.toJson({}, true)

    if (messages.errors.length > 0) {
      messages.errors.forEach((message) => {
        failed = true
        log.message('error', message)
      })
    }

    if (messages.warnings.length > 0) {
      messages.warnings.forEach((message) => {
        failed = true
        log.message('warn', message)
      })
    }

    if (!failed) {
      log.message('success', 'Your app was compiled successfully. Hooray!')
    }
  })

  return compiler
}

module.exports = createCompiler
