import Rx from 'rx'
import path from 'path'
import {copyfile, watchfile} from '../../util/fs'
import logger from '../util/log'

const log = logger('SERVER')

function buildServerFile (source, dest, {dev}) {
  const copyServer = () => copyfile(source, dest)

  return dev
    ? watchfile(source).startWith({}).flatMap(copyServer)
    : copyServer()
}

export function buildServer (testDir, styleguideDir, {dev}) {
  log.message('info', 'START')

  const savedServer$ = Rx.Observable.merge(
    buildServerFile(path.join(__dirname, 'server.js'), path.join(styleguideDir, 'server.js'), {dev}),
    buildServerFile(path.join(testDir, '.config.server.js'), path.join(styleguideDir, '.config.server.js'), {dev})
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
