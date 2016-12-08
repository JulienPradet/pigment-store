import path from 'path'
import browserify from 'browserify'
import cssModulesify from 'css-modulesify'
import watchify from 'watchify'

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

export default config
