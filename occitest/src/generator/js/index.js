import path from 'path'
import {renderBundle} from './renderBundle'
import browserify from 'browserify'
import babelify from 'babelify'
import {saveFiles} from '../../util/fs'

export function buildApp(testDir, styleguideDir, opts) {
  console.log("=== STYLEGUIDE :: BUILD :: TEST :: START")
  
  const build$ = saveFiles(
    renderBundle({
      destPath: path.join(styleguideDir, 'app.js'),
      b: browserify({ debug: true })
        .add(path.join(testDir, 'suites.js'))
        .transform("babelify", {presets: ["es2015", "react"]})
    })
  )

  build$.subscribe(
    (filepath) => console.log("=== STYLEGUIDE :: BUILD :: TEST :: " + filepath),
    (e) => {
      console.error("=== STYLEGUIDE :: BUILD :: TEST :: ERROR")
      console.error(e)
    },
    () => {
      console.log("=== STYLEGUIDE :: BUILD :: TEST :: END")
    }
  )
}
