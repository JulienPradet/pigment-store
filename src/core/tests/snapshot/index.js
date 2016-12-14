const getConfig = require('./getConfig')
const runJest = require('./runJest')

module.exports = function snapshot (testDir, rootDir, opts) {
  return getConfig(testDir, rootDir, opts.config)
    .flatMap((configPath) => runJest(testDir, configPath, opts.jestOptions))
}
