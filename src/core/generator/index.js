const Observable = require('rx').Observable
const buildApp = require('./js')
const buildHtml = require('./html')

module.exports = function generate (sourceDir, testDir, styleguideDir, opts) {
  return Observable.merge(
    buildApp(sourceDir, testDir, styleguideDir, opts),
    buildHtml(styleguideDir, opts)
  )
}
