import {Observable} from 'rx'
import logger from '../../../util/log'

const log = logger('BUILD')

export default (testDir, styleguideDir, {dev}) => (compiler) => {
  return Observable.create((observer) => {
    const bundle = () => {
      compiler.bundle((e, file) => {
        if (e) {
          log.message('error', e.message)
          if (!dev) observer.onError(e.message)
        } else {
          log.message('success', 'Your app was compiled successfully. Hooray!')
          observer.onNext(file)
        }

        if (!dev) observer.onCompleted()
      })
    }

    compiler.on('update', () => {
      log.message('info', 'Compiling...')
      bundle()
    })
    log.message('info', 'Compiling...')
    bundle()
  })
}
