const path = require('path')
const fs = require('fs')

module.exports = (testDir, styleguideDir) => {
  var appDirectory = fs.realpathSync(process.cwd())

  function resolveApp (relativePath) {
    return path.resolve(appDirectory, relativePath)
  }

  var nodePaths = (process.env.NODE_PATH || '')
    .split(process.platform === 'win32' ? ';' : ':')
    .filter(Boolean)
    .map(resolveApp)

  return {
    pigmentStoreEntry: path.resolve(__dirname, '../../../../../index.js'),
    appBuild: resolveApp(styleguideDir),
    appIndexJs: path.resolve(styleguideDir, '.app.js'),
    iframeIndexJs: path.resolve(styleguideDir, '.iframe.js'),
    appSrc: resolveApp(testDir),
    nodePaths: nodePaths
  }
}
