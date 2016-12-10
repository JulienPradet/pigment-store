import path from 'path'
import {Observable} from 'rx'
import {writefile} from '../../../../util/fs'
import fileToReadableStream from './fileToReadableStream'
import configCompiler from './configCompiler'
import render from './render'
import serve from './serve'

const bundler = (testDir, styleguideDir, options) => (appIndexFile$, iframeIndexFile$) => {
  const compiledAppFile$ = appIndexFile$
    .map(fileToReadableStream)
    .map(configCompiler(testDir, styleguideDir, options))
    .flatMap(render(testDir, styleguideDir, options))

  const compiledIframeFile$ = iframeIndexFile$
    .map(fileToReadableStream)
    .map(configCompiler(testDir, styleguideDir, options))
    .flatMap(render(testDir, styleguideDir, options))

  if (options.dev) {
    return serve(testDir, styleguideDir, options)(compiledAppFile$, compiledIframeFile$)
  } else {
    return Observable.merge(
      compiledAppFile$.flatMap((file) => writefile(
        path.join(styleguideDir, 'app.js'),
        file
      )),
      compiledIframeFile$.flatMap((file) => writefile(
        path.join(styleguideDir, 'iframe.js'),
        file
      ))
    )
  }
}

export default bundler
