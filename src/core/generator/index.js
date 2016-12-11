const Observable = require('rx').Observable
const buildApp = require('./js')
const buildHtml = require('./html')

module.exports = function generate (testDir, styleguideDir, opts) {
  return Observable.merge(
    buildApp(testDir, styleguideDir, opts),
    buildHtml(styleguideDir, opts)
  )
}
