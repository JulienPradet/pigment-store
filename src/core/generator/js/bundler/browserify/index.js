const path = require('path')
const Observable = require('rx').Observable
const writefile = require('../../../../util/fs').writefile
const fileToReadableStream = require('./fileToReadableStream')
const configCompiler = require('./configCompiler')
const render = require('./render')
const serve = require('./serve')

const bundler = (testDir, styleguideDir, options) => (appIndexFile$, iframeIndexFile$) => {
  const compiledAppFile$ = appIndexFile$
    .map(fileToReadableStream)
    .map(configCompiler(testDir, styleguideDir, options, 'app'))
    .flatMap(render(testDir, styleguideDir, options))

  const compiledIframeFile$ = iframeIndexFile$
    .map(fileToReadableStream)
    .map(configCompiler(testDir, styleguideDir, options, 'iframe'))
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

module.exports = bundler
