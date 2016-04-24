import Rx from 'rx'
import browserify from 'browserify'

const renderBundle = ({destPath, b}) => {
  return new Rx.Observable.create((observer) => {
    b.bundle((e, file) => {
      if(e) return observer.onError(e)

      observer.onNext({file: file, filepath: destPath})
      observer.onCompleted()
    });

  })
}

export const renderApp = ({sourcePath, destPath}, {external, babelify}) => {
  return renderBundle({
    destPath,
    b: browserify(sourcePath)
      .external(external)
      .transform("babelify", babelify)
  })
}

export const renderVendor = (destPath, modules) => {
  return renderBundle({
    destPath,
    b: browserify()
      .require(modules)
  })
}
