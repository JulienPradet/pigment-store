import path from 'path'
import Rx from 'rx'
import logger from '../util/log'
import buildFile from '../util/buildFile'

const log = logger('HTML')

export function buildHtml (testDir, styleguideDir, {dev}) {
  log.message('info', 'START')

  const savedHtml$ = Rx.Observable.merge(
    buildFile(path.join(__dirname, 'index.html'), path.join(styleguideDir, 'index.html'), {dev}),
    buildFile(path.join(__dirname, 'testIndex.html'), path.join(styleguideDir, 'testIndex.html'), {dev})
  )

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
