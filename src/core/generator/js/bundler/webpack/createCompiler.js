const paths = require('./paths')
const webpack = require('webpack')
const logger = require('../../../util/log')

const log = logger('BUILD')

const isSizeLimitMessage = (message) => (
  message.startsWith('asset size limit') ||
  message.startsWith('entrypoint size limit:') ||
  message.startsWith('webpack performance recommendations:')
)

const formatSize = (size) => {
  if (size <= 0) {
    return '0'
  }

  const types = ['B', 'kB', 'MB', 'GB']
  const index = Math.floor(Math.log(size) / Math.log(1000))
  const formattedSize = (size / Math.pow(1000, index)).toPrecision(3)

  return formattedSize + ' ' + types[index]
}

const assetFilter = (assetName) => (
  !assetName.endsWith('.map') &&
  !/commons\.|hot-update\./.test(assetName)
)

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
      let sizeLimitWarning = false
      messages.warnings.forEach((message) => {
        if (isSizeLimitMessage(message)) {
          if (sizeLimitWarning) {
            return
          }
          sizeLimitWarning = true

          const sizeWarnings = Object.keys(stats.compilation.assets)
            .filter(assetFilter)
            .map((assetName) => ({ name: assetName, asset: stats.compilation.assets[assetName] }))
            .filter(({asset}) => asset.isOverSizeLimit)
            .map(({name, asset}) => ({
              name,
              size: asset.size()
            }))

          if (sizeWarnings.length === 0) {
            return
          }

          message = sizeWarnings.map(({name, size}) => {
            return `${name}: ${formatSize(size)}`
          }).join('\n')

          message = 'Some of your test files are huge once bundled\n' + message
        }

        failed = true
        log.message('warn', message)
      })
    }

    if (!failed) {
      log.message('success', 'Your app was compiled successfully. Hooray!')

      const compileTime = (stats.endTime - stats.startTime) / 1000
      log.message(compileTime > 10 ? 'warn' : 'info', `Compile time: ${compileTime}s`, false)
    }
  })

  return compiler
}

module.exports = createCompiler
