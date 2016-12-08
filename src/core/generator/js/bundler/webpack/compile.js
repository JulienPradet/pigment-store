import {Observable} from 'rx'
import logger from '../../../util/log'

const log = logger('BUILD')

const compile = () => (compiler) => {
  return Observable.create((observer) => {
    log.message('info', 'Compiling...')
    compiler.run(function (err, stats) {
      if (err) {
        observer.onNext({type: 'error', value: err})
      } else {
        observer.onNext({type: 'success'})
      }
      observer.onCompleted()
    })
  })
}

export default compile
