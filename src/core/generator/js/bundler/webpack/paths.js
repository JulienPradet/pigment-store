const path = require('path')
const fs = require('fs')

module.exports = (sourceDir, testDir, styleguideDir) => {
  var appDirectory = fs.realpathSync(process.cwd())

  function resolveApp (relativePath) {
    return path.resolve(appDirectory, relativePath)
  }

  return {
    pigmentStoreEntry: path.resolve(__dirname, '../../../../../'),
    appBuild: resolveApp(styleguideDir),
    appIndexJs: path.resolve(styleguideDir, '.app.js'),
    iframeIndexJs: path.resolve(styleguideDir, '.iframe.js'),
    src: resolveApp(sourceDir),
    test: resolveApp(testDir),
    nodePaths: resolveApp('node_modules')
  }
}
