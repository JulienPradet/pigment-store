import path from 'path'
import {copyfile, watchfile} from '../../util/fs'
import logger from '../util/log'

const log = logger('HTML')

export function buildHtml (destPath, {dev}) {
  log.message('info', 'START')

  const copyHtml = () => copyfile(path.join(__dirname, 'index.html'), path.join(destPath, 'index.html'))
  const savedHtml$ = dev
    ? watchfile(path.join(__dirname, 'index.html')).startWith({}).flatMap(copyHtml)
    : copyHtml()

  savedHtml$.subscribe(
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
