import path from 'path'
import {exists, readfile} from '../../util/fs'
import createIndexFile from './createIndexFile'
import logger from '../util/log'

const log = logger('BUILD')

export function buildApp (testDir, styleguideDir, options) {
  log.message('info', 'START')

  const indexFile$ = exists(path.join(testDir, 'index.js'))
    .flatMap((exists) => {
      if (exists) {
        return readfile(path.join(testDir, 'index.js')).map(({file}) => file)
      } else {
        return createIndexFile(testDir, styleguideDir)
      }
    })

  const bundler = options.bundler(testDir, styleguideDir, options)

  return bundler(indexFile$)
    .tap(
      ({type, value}) => {
        if (type === 'error') {
          log.message('error', 'ERROR')
          log.message('error', value.messages.join('\n'))
        } else {
          log.message('success', 'BUILD SUCCESSFUL')
        }
      },
      (e) => {
        log.message('error', 'UNCAUGHT ERROR')
        log.message('error', e)
      }
    )
}
