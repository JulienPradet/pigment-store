const path = require('path')
const browserify = require('browserify')
const cssModulesify = require('css-modulesify')
const watchify = require('watchify')

const config = (testDir, styleguideDir, {dev}) => (stream) => {
  const b = browserify({
    debug: true,
    cache: {},
    packageCache: {}
  }).add(stream, {file: path.join(styleguideDir, '.index.js')})
    .plugin(cssModulesify, {
      output: path.join(styleguideDir, 'app.css'),
      jsonOutput: path.join(styleguideDir, 'app.css.json'),
      global: true
    })
    .transform('babelify')

  return dev ? watchify(b) : b
}

module.exports = config
