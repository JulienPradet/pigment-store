import path from 'path'
import {writefile} from '../../../../util/fs'
import logger from '../../../util/log'
import fileToReadableStream from './fileToReadableStream'
import configCompiler from './configCompiler'
import render from './render'
import serve from './serve'

const log = logger('BUILD')

const bundler = (testDir, styleguideDir, options) => (indexFile$) => {
  const compiledFile$ = indexFile$
    .map(fileToReadableStream)
    .map(configCompiler(testDir, styleguideDir, options))
    .flatMap(render(testDir, styleguideDir, options))

  if (options.dev) {
    return serve(testDir, styleguideDir, options)(compiledFile$)
  } else {
    return compiledFile$.flatMap((file) => writefile(
      path.join(styleguideDir, 'app.js'),
      file
    ))
  }
}

export default bundler
