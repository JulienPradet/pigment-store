const path = require('path')
const exists = require('../../../util/fs').exists
const Config = require('./Config')

const readConfig = (testDir, indexDir) => {
  const configPath = path.relative(indexDir, path.join(testDir, '.config.client.js'))
  return exists(configPath)
    .map((exists) => (
      exists ? new Config(configPath) : new Config()
    ))
}

module.exports = readConfig
