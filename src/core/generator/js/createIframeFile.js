const path = require('path')
const readCategory = require('./readCategory')

const renderIframeFile = (category, testDir) => {
  const pathToPigmentStore = path.relative(testDir, path.join(__dirname, '../../../index.js'))
  return `
    /* This is a generated file ! Do not override or your changes will be lost on next compilation */
    import PigmentStore from '${pathToPigmentStore}'
    const category = ${category.render()}
    PigmentStore.React.renderIframe(category)
  `
}

module.exports = function createIframeFile (testDir, indexDir) {
  const indexCategory$ = readCategory(testDir, testDir, indexDir)
  return indexCategory$
    .map((category) => renderIframeFile(category, testDir))
}
