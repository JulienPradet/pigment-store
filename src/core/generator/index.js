const Observable = require('rx').Observable
const buildApp = require('./js')
const cleanStyleguide = require('./cleanStyleguide')

module.exports = function generate (sourceDir, testDir, styleguideDir, opts) {
  return cleanStyleguide(styleguideDir, opts)
    .flatMap(() => Observable.merge(
      buildApp(sourceDir, testDir, styleguideDir, opts)
    ))
}
