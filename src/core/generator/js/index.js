import path from 'path'
import {Observable} from 'rx'
import {Readable} from 'stream'
import {renderBundle} from './renderBundle'
import browserify from 'browserify'
import watchify from 'watchify'
import cssModulesify from 'css-modulesify'
import {exists, readfile, saveFiles} from '../../util/fs'
import createSuitesFile from './createSuitesFile'

export function buildApp (testDir, styleguideDir, {dev, babelify}) {
  console.log('=== STYLEGUIDE :: BUILD :: START')

  const build$ = exists(path.join(testDir, 'suites.js'))
    .flatMap((exists) => {
      if (exists) {
        return readfile(path.join(testDir, 'suites.js')).map(({file}) => file)
      } else {
        return createSuitesFile(testDir)
      }
    })
    .tap(console.log)
    .map((file) => {
      const stream = new Readable()
      stream.push(file)
      stream.push(null)
      return stream
    })
    .map((stream) => {
      return browserify({
        debug: true,
        cache: {},
        packageCache: {}
      }).add(stream, {file: path.join(testDir, 'suites.js')})
        .plugin(cssModulesify, {
          output: path.join(styleguideDir, 'app.css'),
          jsonOutput: path.join(styleguideDir, 'app.css.json'),
          global: true
        })
        .transform('babelify')
    })
    .flatMap((b) => {
      return saveFiles(
        renderBundle({
          destPath: path.join(styleguideDir, 'js/app.js'),
          b: dev ? watchify(b) : b
        })
      )
    })

  build$.subscribe(
    (filepath) => console.log('=== STYLEGUIDE :: BUILD :: ' + filepath),
    (e) => {
      console.error('=== STYLEGUIDE :: BUILD :: ERROR')
      console.error(e)
    },
    () => {
      console.log('=== STYLEGUIDE :: BUILD :: END')
    }
  )
}
