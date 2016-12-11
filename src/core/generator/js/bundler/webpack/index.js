const path = require('path')
const saveFiles = require('../../../../util/fs').saveFiles
const createCompiler = require('./createCompiler')
const serve = require('./serve')
const compile = require('./compile')

const bundler = (testDir, styleguideDir, options) => (baseAppIndexFile$, baseIframeIndexFile$) => {
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

  const compiler = createCompiler(testDir, styleguideDir, options)

  return appIndexFile$.combineLatest(iframeIndexFile$, () => {})
    .flatMap(() => options.dev
      ? serve(testDir, styleguideDir, options)(compiler)
      : compile(testDir, styleguideDir, options)(compiler))
}

module.exports = bundler
