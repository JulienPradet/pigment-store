import path from 'path'
import {saveFiles} from '../../../../util/fs'
import createCompiler from './createCompiler'
import serve from './serve'
import compile from './compile'

const bundler = (testDir, styleguideDir, {dev, ...options}) => (baseAppIndexFile$, baseIframeIndexFile$) => {
  const appIndexFile$ = saveFiles(
    baseAppIndexFile$.map((file) => ({
      file: file.toString(),
      filepath: path.join(styleguideDir, '.app.js')
    }))
  )

  const iframeIndexFile$ = saveFiles(
    baseIframeIndexFile$.map((file) => ({
      file: file.toString(),
      filepath: path.join(styleguideDir, '.iframe.js')
    }))
  )

  const compiler = createCompiler(testDir, styleguideDir, {dev})

  return appIndexFile$.combineLatest(iframeIndexFile$, () => {})
    .flatMap(() => dev
      ? serve(testDir, styleguideDir, options)(compiler)
      : compile(testDir, styleguideDir, options)(compiler))
}

export default bundler
