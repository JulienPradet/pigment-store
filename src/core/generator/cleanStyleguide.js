const path = require('path')
const rimraf = require('rimraf')
const Observable = require('rx').Observable

const cleanStyleguide = (styleguideDir, {dev}) => {
  if (dev) {
    return Observable.just(true)
  }

  return Observable.create((observer) => {
    rimraf(path.join(styleguideDir, '*'), (err) => {
      if (err) observer.onError(err)
      observer.onNext()
      observer.onCompleted()
    })
  })
}

module.exports = cleanStyleguide
