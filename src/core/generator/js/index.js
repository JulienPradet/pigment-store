import path from 'path'
import {Readable} from 'stream'
import {exists, readfile, saveFiles} from '../../util/fs'
import createIndexFile from './createIndexFile'
import logger from '../util/log'

const log = logger('BUILD')

export function buildApp (testDir, styleguideDir, options) {
  log.message('info', 'START')

  return exists(path.join(testDir, 'index.js'))
    .flatMap((exists) => {
      if (exists) {
        return readfile(path.join(testDir, 'index.js')).map(({file}) => file)
      } else {
        return createIndexFile(testDir)
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
    .flatMap((file$) => {
      return saveFiles(file$.map((file) => ({
        file,
        filepath: path.join(styleguideDir, 'app.js')
      })))
    })
    .tap(
      (filepath) => {
        log.message('debug', filepath)
        log.message('success', 'BUILD SUCCESSFUL')
      },
      (e) => {
        log.message('error', 'ERROR')
        log.message('error', e.message)
      }
    )
}
