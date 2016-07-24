import path from 'path'
import {Readable} from 'stream'
import {exists, readfile, saveFiles} from '../../util/fs'
import createSuitesFile from './createSuitesFile'

export function buildApp (testDir, styleguideDir, options) {
  console.log('=== STYLEGUIDE :: BUILD :: START')

  const build$ = exists(path.join(testDir, 'suites.js'))
    .flatMap((exists) => {
      if (exists) {
        return readfile(path.join(testDir, 'suites.js')).map(({file}) => file)
      } else {
        return createSuitesFile(testDir)
      }
    })
    .map((file) => {
      const stream = new Readable()
      stream.push(file)
      stream.push(null)
      return stream
    })
    .map(options.bundler.config(testDir, styleguideDir, options))
    .map(options.bundler.render(testDir, styleguideDir, options))
    .flatMap((bundle) => {
      return saveFiles(bundle)
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
