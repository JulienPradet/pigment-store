import path from 'path'
import {saveFiles} from '../../../../util/fs'
import createCompiler from './createCompiler'
import serve from './serve'
import compile from './compile'

const bundler = (testDir, styleguideDir, {dev, ...options}) => (baseIndexFile$) => {
  const indexFile$ = saveFiles(
    baseIndexFile$.map((file) => ({
      file: file.toString(),
      filepath: path.join(styleguideDir, '.index.js')
    }))
  )

  const compiler = createCompiler(testDir, styleguideDir, {dev})

  return indexFile$
    .flatMap((filepath) => dev
      ? serve(testDir, styleguideDir, options)(compiler)
      : compile(testDir, styleguideDir, options)(compiler))
}

export default bundler
