import Rx from 'rx'
import {buildApp} from './js'
import {buildHtml} from './html'

export default function generate (testDir, styleguideDir, opts) {
  return Rx.Observable.merge(
    buildApp(testDir, styleguideDir, opts),
    buildHtml(styleguideDir, opts)
  )
}
