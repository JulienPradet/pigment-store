const path = require('path')
const exists = require('../../util/fs').exists
const readfile = require('../../util/fs').readfile
const createIndexFile = require('./createIndexFile')
const createIframeFile = require('./createIframeFile')
const logger = require('../util/log')

const log = logger('BUILD')

module.exports = function buildApp (sourceDir, testDir, styleguideDir, options) {
  log.message('info', 'START')

  const appIndexFile$ = exists(path.join(testDir, 'index.js'))
    .flatMap((exists) => {
      if (exists) {
        return readfile(path.join(testDir, 'index.js')).map(({file}) => file)
      } else {
        return createIndexFile(testDir, styleguideDir)
      }
    })

  const iframeIndexFile$ = exists(path.join(testDir, 'iframe.js'))
    .flatMap((exists) => {
      if (exists) {
        return readfile(path.join(testDir, 'iframe.js')).map(({file}) => file)
      } else {
        return createIframeFile(testDir, styleguideDir)
      }
    })

  const bundler = options.bundler(sourceDir, testDir, styleguideDir, options)

  return bundler(appIndexFile$, iframeIndexFile$)
    .tap(
      ({type, value}) => {
        if (type === 'error') {
          log.message('error', 'ERROR')
          log.message('error', value.messages.join('\n'))
        } else {
          log.message('success', 'BUILD SUCCESSFUL')
        }
      },
      (e) => {
        log.message('error', 'UNCAUGHT ERROR')
        log.message('error', e)
      }
    )
}
