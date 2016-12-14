const getConfig = require('./getConfig')
const runJest = require('./runJest')

module.exports = function snapshot (testDir, styleguideDir, opts) {
  return getConfig(testDir, styleguideDir, opts.config)
    .flatMap((configPath) => runJest(testDir, configPath, opts.jestOptions))
}
