import path from 'path'
import browserify from 'browserify'
import watchify from 'watchify'
import cssModulesify from 'css-modulesify'
import Rx from 'rx'

export const config = (testDir, styleguideDir, {dev}) => (stream) => {
  const b = browserify({
    debug: true,
    cache: {},
    packageCache: {}
  }).add(stream, {file: path.join(testDir, 'index.js')})
    .plugin(cssModulesify, {
      output: path.join(styleguideDir, 'app.css'),
      jsonOutput: path.join(styleguideDir, 'app.css.json'),
      global: true
    })
    .transform('babelify')

  return dev ? watchify(b) : b
}

export const render = (testDir, styleguideDir, {dev}) => (bundler) => {
  return Rx.Observable.create((observer) => {
    const bundle = () => {
      bundler.bundle((e, file) => {
        if (e) return observer.onError(e)

        observer.onNext(file)
      })
    }

    bundler.on('update', () => {
      bundle()
    })
    bundle()
  })
}

export default {
  config,
  render
}
