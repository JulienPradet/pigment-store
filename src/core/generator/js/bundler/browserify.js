import path from 'path'
import {Readable} from 'stream'
import browserify from 'browserify'
import watchify from 'watchify'
import cssModulesify from 'css-modulesify'
import Rx from 'rx'
import {saveFiles} from '../../../util/fs'

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

const render = (testDir, styleguideDir, {dev}) => (bundler) => {
  return Rx.Observable.create((observer) => {
    const bundle = () => {
      bundler.bundle((e, file) => {
        if (e) {
          observer.onNext({
            type: 'error',
            value: {
              messages: [e.message]
            }
          })
        } else {
          observer.onNext({
            type: 'success',
            value: file
          })
        }

        if (!dev) observer.onCompleted()
      })
    }

    bundler.on('update', () => {
      bundle()
    })
    bundle()
  })
}

export default (testDir, styleguideDir, {dev}) => (file) => {
  const fileStream = new Readable()
  fileStream.push(file)
  fileStream.push(null)

  const bundler = config(testDir, styleguideDir, {dev})(fileStream)
  const file$ = render(testDir, styleguideDir, {dev})(bundler)

  if (!file$) {
    return Rx.Observable.just(true)
  }

  return saveFiles(file$.map((file) => ({
    file,
    filepath: path.join(styleguideDir, 'app.js')
  })))
}
