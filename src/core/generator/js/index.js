import path from 'path'
import {renderBundle} from './renderBundle'
import browserify from 'browserify'
import watchify from 'watchify'
import cssModulesify from 'css-modulesify'
import {saveFiles} from '../../util/fs'

export function buildApp (testDir, styleguideDir, {dev, babelify}) {
  console.log('=== STYLEGUIDE :: BUILD :: START')

  const b = browserify({
    debug: true,
    cache: {},
    packageCache: {}
  })
    .add(path.join(testDir, 'suites.js'))
    .plugin(cssModulesify, {
      output: path.join(styleguideDir, 'app.css'),
      jsonOutput: path.join(styleguideDir, 'app.css.json'),
      global: true
    })
    .transform('babelify')

  const build$ = saveFiles(
    renderBundle({
      destPath: path.join(styleguideDir, 'js/app.js'),
      b: dev ? watchify(b) : b
    })
  )

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
