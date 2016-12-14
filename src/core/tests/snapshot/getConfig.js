const path = require('path')
const Observable = require('rx').Observable
const exists = require('../../util/fs').exists
const writefile = require('../../util/fs').writefile

const generateConfig = (testDir, styleguideDir, configPath) => {
  const jestConfigFile = `{
  "moduleNameMapper": {
    "\\\\.(css|less)$": "identity-obj-proxy",
    "pigment-store": "${path.resolve(__dirname, './mocks/pigment-store/index.js')}"
  },
  "rootDir": "${path.resolve(testDir)}",
  "testRegex": "^${path.resolve(testDir)}/[^\\\\.].*\\\\.js$",
  "testPathDirs": [
    "${path.resolve(process.cwd())}",
    "${path.resolve(testDir)}"
  ],
  "testPathIgnorePatterns": ["/node_modules/", "/__fixtures__/", "/__decorators__/", "__mocks__"]
}`

  return writefile(configPath, jestConfigFile)
}

const getConfig = (testDir, styleguideDir, configPath) => {
  if (!configPath) {
    configPath = path.resolve(testDir, '.jestrc')
  }

  return exists(configPath)
    .flatMap((exists) => (
      exists
        ? Observable.just(configPath)
        : generateConfig(testDir, styleguideDir, configPath)
    ))
}

module.exports = getConfig
