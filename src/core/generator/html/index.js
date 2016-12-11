const path = require('path')
const Observable = require('rx').Observable
const copyfile = require('../../util/fs').copyfile
const watchfile = require('../../util/fs').watchfile
const logger = require('../util/log')

const log = logger('HTML')

module.exports = function buildHtml (destPath, {dev}) {
  log.message('info', 'START')

  const copyHtml = () => Observable.merge(
    copyfile(path.join(__dirname, 'index.html'), path.join(destPath, 'index.html')),
    copyfile(path.join(__dirname, 'iframe.html'), path.join(destPath, 'iframe.html'))
  )
  const savedHtml$ = dev
    ? watchfile(path.join(__dirname, 'index.html')).startWith({}).flatMap(copyHtml)
    : copyHtml()

  return savedHtml$.tap(
    (filepath) => {
      log.message('debug', filepath)
      log.message('success', 'BUILD SUCCESSFUL')
    },
    (e) => {
      log.message('error', 'ERROR')
      log.message('error', e.message)
    }
  )
}
