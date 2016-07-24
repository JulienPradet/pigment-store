import path from 'path'
import {copyfile, watchfile} from '../../util/fs'
import logger from '../util/log'

const log = logger('SERVER')

export function buildServer (destPath, {dev}) {
  log.message('info', 'START')

  const copyServer = () => copyfile(path.join(__dirname, 'server.js'), path.join(destPath, 'server.js'))
  const savedServer$ = dev
    ? watchfile(path.join(__dirname, 'server.js')).startWith({}).flatMap(copyServer)
    : copyServer()

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
