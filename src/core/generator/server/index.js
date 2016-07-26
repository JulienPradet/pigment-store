import Rx from 'rx'
import path from 'path'
import logger from '../util/log'
import buildFile from '../util/buildFile'

const log = logger('SERVER')

export function buildServer (testDir, styleguideDir, {dev}) {
  log.message('info', 'START')

  const savedServer$ = Rx.Observable.merge(
    buildFile(path.join(__dirname, 'server.js'), path.join(styleguideDir, 'server.js'), {dev}),
    buildFile(path.join(testDir, '.config.server.js'), path.join(styleguideDir, '.config.server.js'), {dev})
  )

  savedServer$.subscribe(
    (filepath) => {
      log.message('debug', filepath)
      log.message('success', 'BUILD SUCCESSFUL')
    },
    (e) => {
      log.message('error', 'ERROR')
      log.message('error', e.message)
    },
    () => {}
  )
}
