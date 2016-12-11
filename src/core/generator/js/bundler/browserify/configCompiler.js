const path = require('path')
const browserify = require('browserify')
const cssModulesify = require('css-modulesify')
const watchify = require('watchify')

const config = (testDir, styleguideDir, {dev}, name = 'index') => (stream) => {
  const b = browserify({
    debug: true,
    cache: {},
    packageCache: {}
  }).add(stream, {file: path.join(styleguideDir, `.${name}.js`)})
    .plugin(cssModulesify, {
      output: path.join(styleguideDir, `${name}.css`),
      jsonOutput: path.join(styleguideDir, `${name}.css.json`),
      global: true
    })
    .transform('babelify')

  return dev ? watchify(b) : b
}

module.exports = config
