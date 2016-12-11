const path = require('path')
const readConfig = require('./readConfig')
const readCategory = require('./readCategory')

const renderIndexFile = (category, config, testDir) => {
  const pathToPigmentStore = path.relative(testDir, path.join(__dirname, '../../../index.js'))
  category.name = config.name || 'Pigment Store 🎨'
  return `
    /* This is a generated file ! Do not override or your changes will be lost on next compilation */
    import PigmentStore from '${pathToPigmentStore}'
    const category = ${category.render()}
    const config = ${config.render()}
    PigmentStore.React.renderApp(category, config)
  `
}

module.exports = function createIndexFile (testDir, indexDir) {
  const indexCategory$ = readCategory(testDir, testDir, indexDir)
  const config$ = readConfig(testDir, indexDir)
  return indexCategory$
    .combineLatest(config$, (category, config) => ({category, config}))
    .map(({category, config}) => renderIndexFile(category, config, testDir))
}
