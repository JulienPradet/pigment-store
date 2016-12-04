var path = require('path')
var fs = require('fs')

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
    appBuild: styleguideDir,
    appIndexJs: path.resolve(styleguideDir, '.index.js'),
    appSrc: testDir,
    nodePaths: nodePaths
  }
}
