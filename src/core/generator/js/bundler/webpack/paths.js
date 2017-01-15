const path = require('path')
const fs = require('fs')

module.exports = (sourceDir, testDir, styleguideDir) => {
  var appDirectory = fs.realpathSync(process.cwd())

  function resolveApp (relativePath) {
    return path.resolve(appDirectory, relativePath)
  }

  const pigmentStoreEntry = path.resolve(__dirname, '../../../../../')
  const markdownLoader = './' + path.relative(
    process.cwd(),
    path.join(pigmentStoreEntry, 'core/generator/js/bundler/webpack/pigment-store-markdown-loader')
  )
  return {
    pigmentStoreEntry: pigmentStoreEntry,
    appBuild: resolveApp(styleguideDir),
    appIndexJs: path.resolve(styleguideDir, '.app.js'),
    iframeIndexJs: path.resolve(styleguideDir, '.iframe.js'),
    src: resolveApp(sourceDir),
    test: resolveApp(testDir),
    nodePaths: resolveApp('node_modules'),
    appHtml: path.resolve(__dirname, './index.html'),
    markdownLoader: markdownLoader
  }
}
