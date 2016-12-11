const Observable = require('rx').Observable
const logger = require('../../../util/log')

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

module.exports = compile
